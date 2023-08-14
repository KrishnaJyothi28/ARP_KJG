import { createContext, useContext } from 'react'
import { Criteria, StateOrMsa } from 'src/lib/interface'

export const defaultCriteria = {
  occupation: {
    id: '47-4051.00',
    name: 'Heavy and Tractor-Trailer Truck Drivers',
  },
  location: {
    id: '',
    code: '',
    type: 'state',
    name: '',
    jobPostingsDemand: '',
    workerRolesupply: '',
    averageSalary: '',
  },
  valueType: true,
  metaData: [],
  occupationMetaData: [],
  stateOrMsaMetaData: [
    {
      Occ_Id: '',
      States: [],
      Msa: [],
    },
  ],
}
export const CriteriaContext = createContext<{
  defaultCriteria: Criteria
  setOccupation: (value: { id: string; name: string }) => void
  setLocation: (value: {
    id: string
    code: string
    type: string
    name: string
    jobPostingsDemand: string
    workerRolesupply: string
    averageSalary: string
  }) => void
  setValueType: (value: boolean) => void
  setMetaData: (value: string[]) => void
  setOccupationMetaData: (
    value: { id: string; name: string; description: string; median_salary: number; job_posting: number }[]
  ) => void
  setStateOrMsaMetaData: (value: { Occ_Id: string; States: StateOrMsa[]; Msa: StateOrMsa[] }[]) => void
}>({
  defaultCriteria: {
    occupation: {
      id: '47-4051.00',
      name: 'Heavy and Tractor-Trailer Truck Drivers',
    },
    location: {
      id: '',
      code: '',
      type: 'state',
      name: '',
      jobPostingsDemand: '',
      workerRolesupply: '',
      averageSalary: '',
    },
    valueType: true,
    metaData: [],
    occupationMetaData: [],
    stateOrMsaMetaData: [
      {
        Occ_Id: '',
        States: [],
        Msa: [],
      },
    ],
  },
  setOccupation: () => {},
  setLocation: () => {},
  setValueType: () => {},
  setMetaData: () => {},
  setOccupationMetaData: () => {},
  setStateOrMsaMetaData: () => {},
})

export const useCriteriaContext = () => useContext(CriteriaContext)
