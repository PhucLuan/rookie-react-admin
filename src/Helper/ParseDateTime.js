export const ParseDateTime = (myCSharpString) => {
    var date = new Date(myCSharpString);
    var res = date.toISOString().slice(0, 10);
    return res;
}