import { Traitement} from "./traitement.model"

export interface Complaint {
  idComplaint: number;
  dateComplaint: Date;
  comment: string;
  traitement: Traitement | null;
  createdDate: Date;
  isChecked?: boolean;
}
