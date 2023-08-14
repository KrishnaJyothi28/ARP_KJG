export interface ColumnDropDownData {
  id: string
  name: string
}

export interface StateOrMsa {
  Id: string
  Code: string
  Name: string
  JobPostingsDemand: number
  WorkerRoleSupply: number
  AverageSalary: number
}

export interface Degree {
  SubBA_Degree: number
  BAs_Degree: number
  PostGrad_Degree: number
}

export interface Experience {
  '0_to_2_years': number
  '3_to_5_years': number
  '5+_years': number
}

export interface Data {
  Occ_Id: string
  States: StateOrMsa[]
  Msa: StateOrMsa[]
}

export interface OccDegreeNExperienceData {
  Occ_Id: number
  Occ_Name: string
  Requested_Degree: Degree[]
  Years_Of_Experience: Experience[]
}

export interface DegreeNExperience {
  id: number
  description: string
  percentage: number
}

export interface BubbleChartData {
  id: string
  title: string
  count: number
}

export interface Occupation {
  id: string
  name: string
  description: string
  median_salary: number
  job_posting: number
}

export interface Criteria {
  occupation: { id: string; name: string }
  location: {
    id: string
    code: string
    type: string
    name: string
    jobPostingsDemand: string
    workerRolesupply: string
    averageSalary: string
  }
  valueType: boolean
  metaData: string[]
  occupationMetaData: Occupation[]
  stateOrMsaMetaData: Data[]
}

export interface CardTitleProps {
  title: string
  details?: string
  bgColor?: string
}

export interface ColumnChartData {
  Id: string
  StateCode: string
  Value: number
}

export interface locationType {
  id: string
  code: string
  type: string
  name: string
}

export interface TopSkillsNCredentialsItem {
  Occ_Id: number
  Occ_Name: string
  Occ_Desc: string
  Top_Credentials: string[]
  Top_Specialized_Skills: string[]
  Top_Emerging_Skills: string[]
  Top_Job_Titles: string[]
}

export interface OccupationModalProps {
  openModal: boolean
  closeModal: (isOpen: boolean) => void
}
export interface BarChartProps {
  valueType?: string
  bgColor?: string
  barsColor?: string
  activeBarColor?: string
  data?: any
}
export interface SurveyTablePropType {
  salary: string
  value: string
}
export interface OccupationData {
  data: {
    careerpath: {
      name: string;
      column1: {
        name: string;
        Onet: string[];
      };
      column2: {
        name: string;
        Onet: string[];
      };
      column3: {
        name: string;
        Onet: string[];
      };
    };
  }[];
}
export interface ColumnType {
  name: string;
  Onet: string[];
}
