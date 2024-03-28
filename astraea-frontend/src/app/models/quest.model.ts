export interface Quest {
  id: string;
  prompt: string;
  payload: Record<string, any>;
  type: string;
}
