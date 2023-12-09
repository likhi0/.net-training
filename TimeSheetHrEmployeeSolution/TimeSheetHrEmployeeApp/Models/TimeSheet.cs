using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    public class TimeSheet
    {
        public int TimesheetID { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public double HoursWorked { get; set; }
        public double OverTime { get;set; }
        public string Comments { get; set; } = string.Empty;
        [ForeignKey("Username")]
        public User? User { get; set; }
        
    }
}
