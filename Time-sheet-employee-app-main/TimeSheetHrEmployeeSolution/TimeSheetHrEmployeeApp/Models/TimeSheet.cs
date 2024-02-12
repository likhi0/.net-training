using System.ComponentModel.DataAnnotations.Schema;
using TimeSheetHrEmployeeApp.Models;

public class TimeSheet
{
    public int TimesheetID { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public double TotalHoursWorked { get; set; } // Total worked hours
    public List<WorkEntryRequest> WorkEntries { get; set; } // List of work entries

    [ForeignKey("Username")]
    public User? User { get; set; }
}

public class WorkEntryRequest
{
    public int WorkEntryRequestID { get; set; }
    public DateTime Date { get; set; }
    public string DayOfWeek { get; set; }
    public double HoursWorked { get; set; }
    public double Overtime { get; set; }
    public string Comments { get; set; }
}