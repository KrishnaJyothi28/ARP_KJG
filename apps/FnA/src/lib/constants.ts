export const BaseURL = {
  JobPostingURL: 'https://emsiservices.com/jpa/',
  ProfileURL: 'https://emsiservices.com/profiles/',
  careerPathURL: 'https://emsiservices.com/career-pathways/dimensions/',
}

export const jobRequest = {
  filter: {
    when: {
      start: '2022-08',
      end: '2023-07',
    },
    lot_career_area_name: ['Transportation'],
    onet: ['47-4051.00'],
  },
  rank: {
    by: 'unique_postings',
    limit: 5,
  },
}

export const profileRequest = {
  filter: {
    last_updated: {
      start: '2022',
      end: '2023',
    },
    onet: ['47-4051.00'],
  },
  rank: {
    by: 'profiles',
    limit: 1000,
    min_profiles: 1,
  },
}

export const distributionRequest = {
  filter: {
    when: {
      start: '2022-08',
      end: '2023-07',
    },
    lot_career_area_name: ['Transportation'],
    onet: ['47-4051.00'],
  },
  distribution: {
    type: 'percentile',
    options: {
      keys: [25, 50, 75],
    },
  },
}

export const careerPathRequest = {
  id: '23141014',
  categories: ['Advancement', 'LateralAdvancement', 'Similar', 'LateralTransition'],
  region: {
    nation: 'us',
  },
  limit: 100,
}
