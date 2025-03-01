import { Client as workFlowClient } from "@upstash/workflow";
import { config } from "dotenv";

config();

const worksFlowClient = new workFlowClient({
  baseUrl: process.env.QSTASH_URL,
  token: process.env.QSTASH_TOKEN,
});

export default worksFlowClient;
