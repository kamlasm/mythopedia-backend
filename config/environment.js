import dotenv from "dotenv";
dotenv.config();

export const dbURI = process.env.MONGODB_URI;
export const port = process.env.PORT || 4000;
export const secret = process.env.SECRET || 'kamlaandmelanielovegreekmythology';