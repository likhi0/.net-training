using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimeSheetHrEmployeeApp.Models
{
    public class Tasks
    {
        [Key]
        public int TaskID { get; set; }
       
        public string TaskDescription { get; set; } = string.Empty;


    }
}
