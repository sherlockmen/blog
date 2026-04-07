# 算法复杂度分析

## 1 迭代与递归

### 1.1 **迭代**
> 迭代（iteration）是一种重复执行某个任务的控制结构。在迭代中，程序会在满足一定的条件下重复执行某段代码，直到这个条件不再满足。

#### 1.1.1 `for`循环

for 循环是最常见的迭代形式之一，`适合在预先知道迭代次数时使用`。

下面的函数基于`for`循环实现了求和`1 + 2 + ... + n`，求和结果使用变量 res 记录。需要注意的是，
**Python**中`range(a, b)`对应的区间是“左闭右开”的，对应的遍历范围为`a, a+1, ... , b-1`：

```pytutor-python
def for_loop(n: int) -> int:
    """for 循环"""
    res = 0
    # 循环求和 1, 2, ..., n-1, n
    # 相当于  1 <= i < n; i∈[1,n)左闭右开区间
    for i in range(1, n + 1):
        res += i
    return res
    
if __name__ == "__main__":
    n = 5
    res = for_loop(n)
    print(f"\nfor循环的求和结果 res = {res}")
```