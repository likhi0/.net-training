using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    public class TimeSheetDetails
    {
        [Key]
        public int TimesheetdetailID { get; set; }
        public int TimesheetID { get; set; }
        public int TaskID {  get; set; }
        public Double NoofHours { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("TaskID")]
        public Tasks? Task { get; set; }
        [ForeignKey("TimesheetID")]
        public  TimeSheet? TimeSheet{get;set;}

    }
}
