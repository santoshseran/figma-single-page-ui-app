import type { Category, DataRecord, Status } from "../types";

export const CATEGORY_OPTIONS: Category[] = ["Type A", "Type B", "Type C"];
export const STATUS_OPTIONS: Status[] = ["Active", "Inactive", "Pending"];

export const SEED_RECORDS: DataRecord[] = [
  {
    id: "1",
    reviewer: "John Smith",
    asofmonth: "2026-01",
    customerName: "Acme Corp",
    accountNumber: "ACC001",
    status: "Active",
    approved: true,
    category: "Type A",
    amount: 15000,
    comments: "Initial review complete"
  },
  {
    id: "2",
    reviewer: "Sarah Johnson",
    asofmonth: "2026-01",
    customerName: "Tech Industries",
    accountNumber: "ACC002",
    status: "Pending",
    approved: false,
    category: "Type B",
    amount: 22000,
    comments: "Awaiting approval"
  },
  {
    id: "3",
    reviewer: "John Smith",
    asofmonth: "2026-02",
    customerName: "Global Solutions",
    accountNumber: "ACC003",
    status: "Active",
    approved: true,
    category: "Type A",
    amount: 18500,
    comments: "Verified"
  },
  {
    id: "4",
    reviewer: "Mike Wilson",
    asofmonth: "2026-02",
    customerName: "Innovation Labs",
    accountNumber: "ACC004",
    status: "Inactive",
    approved: false,
    category: "Type C",
    amount: 9500,
    comments: "Under review"
  },
  {
    id: "5",
    reviewer: "Sarah Johnson",
    asofmonth: "2026-02",
    customerName: "Digital Ventures",
    accountNumber: "ACC005",
    status: "Active",
    approved: true,
    category: "Type B",
    amount: 31000,
    comments: "Approved"
  },
  {
    id: "6",
    reviewer: "Mike Wilson",
    asofmonth: "2026-03",
    customerName: "Cloud Systems",
    accountNumber: "ACC006",
    status: "Pending",
    approved: false,
    category: "Type A",
    amount: 12000,
    comments: "Pending documentation"
  },
  {
    id: "7",
    reviewer: "John Smith",
    asofmonth: "2026-03",
    customerName: "Data Dynamics",
    accountNumber: "ACC007",
    status: "Active",
    approved: true,
    category: "Type C",
    amount: 27500,
    comments: "Complete"
  },
  {
    id: "8",
    reviewer: "Sarah Johnson",
    asofmonth: "2026-03",
    customerName: "Enterprise Hub",
    accountNumber: "ACC008",
    status: "Active",
    approved: true,
    category: "Type B",
    amount: 19800,
    comments: "Finalized"
  },
  {
    id: "9",
    reviewer: "Mike Wilson",
    asofmonth: "2026-04",
    customerName: "Smart Solutions",
    accountNumber: "ACC009",
    status: "Pending",
    approved: false,
    category: "Type A",
    amount: 14200,
    comments: "In progress"
  },
  {
    id: "10",
    reviewer: "John Smith",
    asofmonth: "2026-04",
    customerName: "Future Tech",
    accountNumber: "ACC010",
    status: "Active",
    approved: true,
    category: "Type B",
    amount: 33000,
    comments: "Ready"
  }
];

