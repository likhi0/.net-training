namespace TimeSheetHrEmployeeApp.Exceptions
{
    [Serializable]
    public class NoTimeSheetAvaliableException : Exception
    {
        string message;
        public NoTimeSheetAvaliableException()
        {
            message = "No such timesheet found";
        }
        public override string Message => message;
    }
}
