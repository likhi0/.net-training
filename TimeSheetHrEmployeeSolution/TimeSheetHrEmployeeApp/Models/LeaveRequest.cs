using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    public class LeaveRequest
    {
        public int LeaveRequestID { get; set; }
        public string Username { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status  { get; set; }

        [ForeignKey("Username")]
        public User? User { get; set; }
    }

}
