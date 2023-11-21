namespace TimeSheetHrEmployeeApp.Exceptions
{
    public class NoProfileFoundException : Exception

    {
        string message;
        public NoProfileFoundException() 
        {
            message = "No such profile found";
        }
        public override string Message => message;
    }
}
