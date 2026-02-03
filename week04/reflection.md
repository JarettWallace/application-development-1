1: The orginal bug in the code was a reference error that was caused by the use of discount which was not defined causing the error as it did not have any value tied to it

2: Logging helped explain the program behavior as it broke it down into a step by step process rather than the wall of tect it was making before making it much easier to read and understand 

3: Testing is better than rerunnung the script as testing is more consistent and is better at catching edge cases that normally might be missed when manually rerunning a script 

4: I would keep the first test provided that being the "applies discount when total is greater than 100", I would keep this as for one it was provided to me ensuring that it will work. this test also uses the main function of the program that being the discount logic, it also will fail if the orginal error is present. and lastly in an actual use case totals over 100 arent that common but it is something the system must be ready to check for and handel. 