export interface propertyInfo {
  id: number;
  userId: number;
  name: string;
  ptype: string;
  location: string;
  measurement: string;
  unitcount: number;
  pricepermonth: number;
  anemities: string[];
  description: string;
}

export interface messageBody {
  title: string;
  senderemail: string;
  message: string;
}
