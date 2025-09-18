export interface CertificateData {
  id: string;
  name: string;
  dob: string;
  time_join: string;
  time_leave: string;
  issuedDate?: string;
  issuerName?: string;
  organizationName?: string;
  certificateNumber?: string;
  // Thank-you letter fields
  donationAmount?: string;
  description1?: string;
  description2?: string;
}

export interface CsvRow {
  name: string;
  dob: string;
  time_join: string;
  time_leave: string;
  [key: string]: string;
}

export interface CertificateFormData {
  name: string;
  dob: string;
  time_join: string;
  time_leave: string;
  issuedDate: string;
  issuerName: string;
  organizationName: string;
}
