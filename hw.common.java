public String testMethod(){
    String rtnStr = '';

    // 일반적으로 사용되지 않고 리소스 소모가 크다고 함.
    String methodName = new Object() {}.getClass().getEnclosingMethod().getName();
    System.out.println(methodName); // testMethod
    
    // 위의 방식보다 효율적.
    String MethodName2 = Thread.currentThread().getStackTrace()[1].getMethodName();
    System.out.println(methodName2); // testMethod

    return rtnStr;
}