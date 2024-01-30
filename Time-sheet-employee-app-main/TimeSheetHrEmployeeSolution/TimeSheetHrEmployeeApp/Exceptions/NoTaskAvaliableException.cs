namespace TimeSheetHrEmployeeApp.Exceptions
{
    public class NoTaskAvaliableException : Exception
    {
        string message;
        public NoTaskAvaliableException()
        {
            message = "No such profile found";
        }
        public override string Message => message;
    }
}
