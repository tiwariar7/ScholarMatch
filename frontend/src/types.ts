
export interface Scholarship {
  id: string;
  name: string;
  deadline: string;
  location: string;
  amount: string;
  description?: string;
  applicationLink: string;
}


export interface IndianScholarshipCriteria {
  education: string;
  qualification: string;
  gender: string;
  community: string;
  religion: string;
  isExServiceman: boolean;
  hasDisability: boolean;
  hasSportsAchievements: boolean;
  annualPercentage: number;
  income: number;
}

export interface InternationalScholarshipCriteria {
  name?: string;
  location?: string;
  amount?: string;
  deadline?: string;
}