
using System.ComponentModel.DataAnnotations;

namespace TimeSheetHrEmployeeApp.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; } = string.Empty;
        public byte[] Password { get; set; } 
        public string Role { get; set; } = string.Empty;
        public byte[] Key { get; set; }
        public ICollection<TimeSheet> ?Timesheets { get; set; }
        public ICollection<LeaveRequest> ?LeaveRequests { get; set; }
        public Profile Profiles { get; set; }
    }
}
