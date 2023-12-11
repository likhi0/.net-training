namespace TimeSheetHrEmployeeApp.Exceptions
{
    public class NoLeaveRequestAvailableException:Exception
    {
        string message;
        public NoLeaveRequestAvailableException()
        {
            message = "No leave requests available";
        }
        public override string Message => message;
    }
}
