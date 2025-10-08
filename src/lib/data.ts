export const dashboardStats = [
    { title: "Pending Applications", value: "12", change: "+12.5%", changeType: "increase" as const, icon: "FileText" as const },
    { title: "Data Requests", value: "8", change: "-5.2%", changeType: "decrease" as const, icon: "ArrowRightLeft" as const },
    { title: "Approved Documents", value: "245", change: "+20.1%", changeType: "increase" as const, icon: "CheckCircle" as const },
    { title: "Security Alerts", value: "3", change: "+300%", changeType: "increase" as const, icon: "ShieldAlert" as const },
];

export const chartData = [
  { month: "January", applications: 186, exchanges: 80 },
  { month: "February", applications: 305, exchanges: 200 },
  { month: "March", applications: 237, exchanges: 120 },
  { month: "April", applications: 73, exchanges: 190 },
  { month: "May", applications: 209, exchanges: 130 },
  { month: "June", applications: 214, exchanges: 140 },
];

export const applicationsData = [
    { id: "APP-001", type: "Passport Renewal", ministry: "Home Affairs", status: "Approved", submitted: "2023-06-01" },
    { id: "APP-002", type: "Visa Application", ministry: "Foreign Affairs", status: "Pending", submitted: "2023-06-15" },
    { id: "APP-003", type: "Medical Records Request", ministry: "Health", status: "Rejected", submitted: "2023-06-20" },
    { id: "APP-004", type: "University Transcript", ministry: "Education", status: "Approved", submitted: "2023-05-10" },
    { id: "APP-005", type: "Birth Certificate", ministry: "Home Affairs", status: "Pending", submitted: "2023-06-22" },
    { id: "APP-006", type: "Work Permit", ministry: "Foreign Affairs", status: "Approved", submitted: "2023-04-18" },
];

export const auditTrailData = [
    { timestamp: "2023-06-23 10:00:15", user: "Admin User", action: "LOGIN_SUCCESS", details: "User logged in from IP 192.168.1.1" },
    { timestamp: "2023-06-23 10:05:22", user: "Jane Doe (Health)", action: "VIEW_APPLICATION", details: "Viewed application APP-003" },
    { timestamp: "2023-06-23 10:06:45", user: "Jane Doe (Health)", action: "REJECT_APPLICATION", details: "Rejected application APP-003. Reason: Insufficient documentation." },
    { timestamp: "2023-06-22 14:30:00", user: "John Smith (Home Affairs)", action: "CREATE_APPLICATION", details: "Created application APP-005" },
    { timestamp: "2023-06-22 09:00:00", user: "SysAdmin", action: "UPDATE_ROLE", details: "Updated role for 'user@gov.sg' to 'Admin'" },
];

export const usersData = [
    { name: "Admin User", email: "admin@gov.sg", role: "Super Admin", ministry: "All" },
    { name: "John Smith", email: "john.smith@gov.sg", role: "Officer", ministry: "Home Affairs" },
    { name: "Jane Doe", email: "jane.doe@gov.sg", role: "Officer", ministry: "Health" },
    { name: "Peter Jones", email: "peter.jones@gov.sg", role: "Auditor", ministry: "All" },
    { name: "Emily White", email: "emily.white@gov.sg", role: "Officer", ministry: "Education" },
    { name: "Michael Brown", email: "michael.brown@gov.sg", role: "Officer", ministry: "Foreign Affairs" },
];
