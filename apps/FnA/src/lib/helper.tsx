import { lightcastAPI } from 'src/services/lightcastAPI'
import { BaseURL, distributionRequest, jobRequest, profileRequest } from './constants'

const getStateNMsaValues = async (locType: string, occ_Id: string, meta:any) => {
  //StateId and StateName
  const states = (
    await lightcastAPI.getLightcastAPI(BaseURL.JobPostingURL + 'taxonomies/' + locType + '?limit=1000', 'postings:us')
  ).data
  //StateName and JobPostingsDemand
  let jobDemandRequest = jobRequest
  jobDemandRequest.filter.when.end = meta[0]
  jobDemandRequest.filter.when.start = meta[1]
  jobDemandRequest.filter.onet = [occ_Id]
  jobDemandRequest.rank.limit = locType === 'state' ? 100 : 1000
  jobDemandRequest.rank.by = 'unique_postings'
  const jobPostingsDemand = (
    await lightcastAPI.postLightcastAPI(
      BaseURL.JobPostingURL + 'rankings/' + locType + '_name',
      jobDemandRequest,
      'postings:us'
    )
  ).data.ranking.buckets
  //StateName and WorkerRoleSupply
  let workerRoleSupplyRequest = profileRequest
  workerRoleSupplyRequest.filter.onet = [occ_Id]
  workerRoleSupplyRequest.filter.last_updated.end = meta[0]
  workerRoleSupplyRequest.filter.last_updated.start = meta[1]
  const workerRoleSupply = (
    await lightcastAPI.postLightcastAPI(
      BaseURL.ProfileURL + 'rankings/' + locType + '_name',
      workerRoleSupplyRequest,
      'profiles:us'
    )
  ).data.ranking.buckets
  //StateName and AverageSalary
  let averageSalaryRequest = JSON.parse(JSON.stringify(jobRequest))
  averageSalaryRequest.filter.onet = [occ_Id]
  averageSalaryRequest.filter.when.end = meta[0]
  averageSalaryRequest.filter.when.start = meta[1]
  averageSalaryRequest.rank.limit = locType === 'state' ? 100 : 1000
  averageSalaryRequest.rank.extra_metrics = ['median_salary']
  const averageSalary = (
    await lightcastAPI.postLightcastAPI(
      BaseURL.JobPostingURL + 'rankings/' + locType + '_name',
      averageSalaryRequest,
      'postings:us'
    )
  ).data.ranking.buckets

  //Merge all above data
  const data: any = states.reduce((result: any, item1: any) => {
    const matchJobPosting = jobPostingsDemand.find((item2: any) => item2.name === item1.name)
    const matchWorkerRole = workerRoleSupply.find((item2: any) => item2.name === item1.name)
    const averageSalaryObj = averageSalary.find((salary: any) => salary.name === item1.name)
    if (
      matchJobPosting &&
      matchWorkerRole &&
      averageSalaryObj &&
      matchJobPosting.unique_postings !== 0 &&
      matchWorkerRole.profiles !== 0 &&
      averageSalaryObj.median_salary !== 0
    ) {
      result.push({
        Id: parseInt(item1.id),
        Code: item1.id.toString(),
        Name: item1.name,
        JobPostingsDemand: matchJobPosting.unique_postings,
        WorkerRoleSupply: matchWorkerRole.profiles,
        AverageSalary: averageSalaryObj.median_salary,
      })
    }

    return result
  }, [])

  return data
}

const getSalaryValues = async (endpoint: string, scope: string, metaData: string[], occId?: string) => {
  let request = distributionRequest
  request.filter.when.end = metaData[0]
  request.filter.when.start = metaData[1]
  occId ? (request.filter.onet = [occId]) : ''
  const data: any = await lightcastAPI.postLightcastAPI(endpoint, request, scope)
  return data.data.distribution.buckets
}

export { getSalaryValues, getStateNMsaValues }
