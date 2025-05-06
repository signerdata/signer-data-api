export type NewApplication = {
  userId: string;
  name: string;
  description?: string;
  domain: string;
}; 

export type Application = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  domain: string;
  active: boolean;
};
