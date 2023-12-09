namespace TimeSheetHrEmployeeApp.Exceptions
{
    public class NoLeaveRequestAvailableException:Exception
    {
        string message;
        public NoLeaveRequestAvailableException()
        {
            message = "No such timesheet found";
        }
        public override string Message => message;
    }
}
