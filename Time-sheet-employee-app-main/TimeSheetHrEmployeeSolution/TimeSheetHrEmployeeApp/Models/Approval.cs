using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    public class Approval
    {
        public int ApprovalID { get; set; }
       // public int TimesheetID { get; set; }
        public string Approvedby { get; set; } = string.Empty;
        public DateTime AprrovedDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        [ForeignKey("Username")]
        public User? User { get; set; }
        // public User Approver { get; set; }
    }

}
