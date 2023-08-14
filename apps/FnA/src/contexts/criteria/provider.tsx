import { useEffect, useState } from 'react'
import { Criteria, StateOrMsa } from 'src/lib/interface'
import { dataAPI } from 'src/services/dataAPI'
import { CriteriaContext, defaultCriteria } from '.'

const CriteriaProvider = ({ children, criteria }: { children: React.ReactNode; criteria: Criteria }) => {
  const [state, setState] = useState<Criteria>(defaultCriteria)

  const setOccupation = (value: { id: string; name: string }) => {
    setState((prevState) => ({
      ...prevState,
      occupation: value,
    }))
  }

  const setLocation = (value: {
    id: string
    code: string
    type: string
    name: string
    jobPostingsDemand: string
    workerRolesupply: string
    averageSalary: string
  }) => {
    setState((prevState) => ({
      ...prevState,
      location: value,
    }))
  }

  const setValueType = (value: boolean) => {
    setState((prevState) => ({
      ...prevState,
      valueType: value,
    }))
  }

  const setMetaData = (value: string[]) => {
    setState((prevState) => ({
      ...prevState,
      metaData: value,
    }))
  }

  const setOccupationMetaData = (
    value: { id: string; name: string; description: string; median_salary: number; job_posting: number }[]
  ) => {
    setState((prevState) => ({
      ...prevState,
      occupationMetaData: value,
    }))
  }

  const setStateOrMsaMetaData = (value: { Occ_Id: string; States: StateOrMsa[]; Msa: StateOrMsa[] }[]) => {
    setState((prevState) => ({
      ...prevState,
      stateOrMsaMetaData: value,
    }))
  }

  useEffect(() => {
    dataAPI
      .getOccupationsList()
      .then((data: any) => {
        setOccupationMetaData(data)
        setOccupation(data[0])
      })
      .catch((error) => {
        console.error('Error fetching occupation metadata:', error)
      })
  }, [state.metaData])

  useEffect(() => {
    dataAPI
      .getMetaData()
      .then((data: any) => {
        setMetaData(data)
      })
      .catch((error) => {
        console.error('Error fetching metadata:', error)
      })
  }, [])

  useEffect(() => {
    dataAPI
      .getStateNMsaData(state.occupation.id)
      .then((data: any) => {
        setStateOrMsaMetaData(data)
      })
      .catch((error) => {
        console.error('Error fetching StateOrMsa metadata:', error)
      })
  }, [state.occupation.id])

  const contextValue = {
    defaultCriteria: state,
    setOccupation,
    setLocation,
    setValueType,
    setMetaData,
    setOccupationMetaData,
    setStateOrMsaMetaData,
  }

  return <CriteriaContext.Provider value={contextValue}>{children}</CriteriaContext.Provider>
}

export default CriteriaProvider
