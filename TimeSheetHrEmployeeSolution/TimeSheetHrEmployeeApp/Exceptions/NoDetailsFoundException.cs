namespace TimeSheetHrEmployeeApp.Exceptions
{
    public class NoDetailsFoundException : Exception
    {
        string message;
        public NoDetailsFoundException()
        {
            message = "No such Details found";
        }
        public override string Message => message;

    }
    
}
