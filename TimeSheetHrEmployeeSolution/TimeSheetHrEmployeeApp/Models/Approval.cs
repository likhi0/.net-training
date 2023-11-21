using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    public class Approval
    {
        public int ApprovalID { get; set; }
       // public int TimesheetID { get; set; }
        public string Approvedby { get; set; }
        public DateTime AprrovedDate { get; set; }
        public string Status  { get; set; }
        public string Comment { get; set; }
        public int TimesheetID { get; set; }
        [ForeignKey("TimesheetID")]
        public TimeSheet? Timesheet { get; set; }
       // public User Approver { get; set; }
    }

}
