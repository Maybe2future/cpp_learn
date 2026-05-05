/* ===== C++ 全栈教程 - 章节内容 ===== */

const CHAPTERS = [
  {
    id: "ch0",
    title: "第0章：准备工作",
    icon: "🚀",
    summary: "了解 C++ 语言，安装开发环境，编写第一个 Hello World 程序",
    version: "",
    topics: ["简介", "环境", "Hello World"],
    content: `
<h2>什么是 C++？</h2>
<p>C++ 是一种通用的、编译型的编程语言，由 Bjarne Stroustrup 于 1979 年在贝尔实验室开发。它在 C 语言的基础上增加了面向对象编程、泛型编程和函数式编程等特性。</p>

<div class="callout tip">
  <div class="callout-icon">💡 为什么选择 C++？</div>
  <p>C++ 兼具高性能和高级抽象能力，广泛应用于系统软件、游戏开发、嵌入式系统、高性能计算和金融交易等领域。</p>
</div>

<h2>C++ 历史与标准版本</h2>
<table>
  <tr><th>版本</th><th>年份</th><th>主要特性</th></tr>
  <tr><td>C++98</td><td>1998</td><td>第一个标准版本</td></tr>
  <tr><td>C++03</td><td>2003</td><td>缺陷修复版</td></tr>
  <tr><td><span class="version-tag tag-cpp11">C++11</span></td><td>2011</td><td>自动类型推导、Lambda、智能指针、范围for</td></tr>
  <tr><td><span class="version-tag tag-cpp14">C++14</span></td><td>2014</td><td>泛型 Lambda、变量模板、改进的 auto</td></tr>
  <tr><td><span class="version-tag tag-cpp17">C++17</span></td><td>2017</td><td>结构化绑定、if/switch初始化、filesystem</td></tr>
  <tr><td><span class="version-tag tag-cpp20">C++20</span></td><td>2020</td><td>概念、协程、模块、范围库</td></tr>
</table>

<h2>安装开发环境</h2>
<p>推荐使用 VS Code + GCC/Clang 编译器：</p>
<ol>
  <li>下载并安装 <a href="https://code.visualstudio.com/" target="_blank">VS Code</a></li>
  <li>安装 C/C++ 扩展插件</li>
  <li>安装编译器：Windows 推荐 MinGW-w64，macOS 安装 Xcode Command Line Tools，Linux 用 <code>sudo apt install build-essential</code></li>
</ol>

<h2>第一个程序：Hello, World!</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left">
      <span class="code-lang">C++</span>
    </div>
    <div class="code-actions">
      <button class="code-btn copy-btn">📋 复制</button>
    </div>
  </div>
  <pre><code>#include &lt;iostream&gt;

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 编译与运行</div>
  <p>保存为 <code>hello.cpp</code>，然后在终端运行：</p>
  <p><code>g++ hello.cpp -o hello && ./hello</code></p>
</div>
`
  },
  {
    id: "ch1",
    title: "第1章：基础语法",
    icon: "📐",
    summary: "变量、数据类型、常量、运算符与基本的输入输出",
    version: "",
    topics: ["变量", "类型", "运算符", "IO"],
    content: `
<h2>程序结构</h2>
<p>C++ 程序由函数组成，每个程序必须有一个 <code>main()</code> 函数作为入口点。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left">
      <span class="code-lang">C++</span>
    </div>
    <div class="code-actions">
      <button class="code-btn copy-btn">📋 复制</button>
    </div>
  </div>
  <pre><code>// 这是单行注释
/* 这是
   多行注释 */

#include &lt;iostream&gt;  // 包含输入输出库

int main() {           // 主函数
    return 0;          // 返回0表示成功
}</code></pre>
</div>

<h2>变量与数据类型</h2>
<table>
  <tr><th>类型</th><th>说明</th><th>示例</th><th>大小（通常）</th></tr>
  <tr><td><code>int</code></td><td>整数</td><td><code>int age = 20;</code></td><td>4 字节</td></tr>
  <tr><td><code>float</code></td><td>单精度浮点</td><td><code>float pi = 3.14f;</code></td><td>4 字节</td></tr>
  <tr><td><code>double</code></td><td>双精度浮点</td><td><code>double e = 2.71828;</code></td><td>8 字节</td></tr>
  <tr><td><code>char</code></td><td>字符</td><td><code>char c = 'A';</code></td><td>1 字节</td></tr>
  <tr><td><code>bool</code></td><td>布尔</td><td><code>bool flag = true;</code></td><td>1 字节</td></tr>
  <tr><td><span class="version-tag tag-cpp11">C++11</span> <code>auto</code></td><td>自动推导</td><td><code>auto x = 42;</code></td><td>取决于初始化值</td></tr>
</table>

<div class="callout warning">
  <div class="callout-icon">⚠️ 注意</div>
  <p>使用 <code>auto</code> 时，编译器会根据初始化表达式自动推断类型。这在复杂类型（如迭代器）时特别有用。</p>
</div>

<h2>常量</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left">
      <span class="code-lang">C++</span>
      <span class="version-tag tag-cpp11">C++11</span>
    </div>
    <div class="code-actions">
      <button class="code-btn copy-btn">📋 复制</button>
    </div>
  </div>
  <pre><code>const int MAX_SIZE = 100;       // 运行时常量
constexpr int MIN_SIZE = 10;   // 编译期常量 (C++11)

int arr[MAX_SIZE];   // OK
int arr2[MIN_SIZE];  // OK - constexpr 可用于编译期语境</code></pre>
</div>

<h2>运算符</h2>
<table>
  <tr><th>类别</th><th>运算符</th><th>示例</th></tr>
  <tr><td>算术</td><td><code>+ - * / %</code></td><td><code>a + b, a % b</code></td></tr>
  <tr><td>关系</td><td><code>== != > < >= <=</code></td><td><code>a == b</code></td></tr>
  <tr><td>逻辑</td><td><code>&& || !</code></td><td><code>a && b</code></td></tr>
  <tr><td>位运算</td><td><code>& | ^ ~ << >></code></td><td><code>a & b, a << 2</code></td></tr>
  <tr><td>赋值</td><td><code>= += -= *= /=</code></td><td><code>a += 5</code></td></tr>
  <tr><td>自增自减</td><td><code>++ --</code></td><td><code>++a, a++</code></td></tr>
</table>

<h2>输入输出</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left">
      <span class="code-lang">C++</span>
    </div>
    <div class="code-actions">
      <button class="code-btn copy-btn">📋 复制</button>
    </div>
  </div>
  <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    int age;
    std::string name;

    std::cout << "请输入你的名字: ";
    std::cin >> name;           // 读取单词

    std::cout << "请输入你的年龄: ";
    std::cin >> age;

    std::cout << "你好, " << name << "! 你今年 " << age << " 岁。" << std::endl;

    // 读取整行（包含空格）
    std::cin.ignore();  // 清除换行符
    std::getline(std::cin, name);

    return 0;
}</code></pre>
</div>
`
  },
  {
    id: "ch2",
    title: "第2章：流程控制",
    icon: "🔄",
    summary: "条件判断、循环结构和跳转语句",
    version: "C++11",
    topics: ["if/else", "switch", "for", "while"],
    content: `
<h2>条件语句</h2>

<h3>if / else</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int score = 85;

if (score >= 90) {
    std::cout << "优秀" << std::endl;
} else if (score >= 80) {
    std::cout << "良好" << std::endl;
} else if (score >= 60) {
    std::cout << "及格" << std::endl;
} else {
    std::cout << "不及格" << std::endl;
}

// 三元运算符
std::string result = (score >= 60) ? "通过" : "未通过";</code></pre>
</div>

<h3>switch</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int day = 3;

switch (day) {
    case 1:
        std::cout << "星期一" << std::endl;
        break;
    case 2:
        std::cout << "星期二" << std::endl;
        break;
    case 3:
        std::cout << "星期三" << std::endl;
        break;
    default:
        std::cout << "其他" << std::endl;
}</code></pre>
</div>

<h2>循环</h2>

<h3>for 循环</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 传统 for 循环
for (int i = 0; i < 10; i++) {
    std::cout << i << " ";
}

// C++11 范围 for 循环
std::vector<int> nums = {1, 2, 3, 4, 5};
for (int n : nums) {
    std::cout << n << " ";
}

// 使用 auto
for (auto n : nums) {
    std::cout << n << " ";
}</code></pre>
</div>

<h3>while / do-while</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int i = 0;

// while - 先判断再执行
while (i < 5) {
    std::cout << i << " ";
    i++;
}

// do-while - 先执行再判断（至少执行一次）
int j = 0;
do {
    std::cout << j << " ";
    j++;
} while (j < 5);</code></pre>
</div>

<h2>跳转语句</h2>
<table>
  <tr><th>语句</th><th>作用</th><th>示例</th></tr>
  <tr><td><code>break</code></td><td>跳出当前循环或 switch</td><td><code>break;</code></td></tr>
  <tr><td><code>continue</code></td><td>跳过本次循环剩余部分</td><td><code>continue;</code></td></tr>
  <tr><td><code>return</code></td><td>从函数返回</td><td><code>return 0;</code></td></tr>
  <tr><td><code>goto</code></td><td>跳转到标签（不推荐）</td><td><code>goto label;</code></td></tr>
</table>
`
  },
  {
    id: "ch3",
    title: "第3章：函数",
    icon: "⚙️",
    summary: "函数定义、参数传递、重载与 Lambda 表达式",
    version: "C++11",
    topics: ["函数", "重载", "Lambda"],
    content: `
<h2>函数定义与调用</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 函数声明
int add(int a, int b);

// 函数定义
int add(int a, int b) {
    return a + b;
}

// 主函数中调用
int result = add(3, 5);  // result = 8</code></pre>
</div>

<h2>参数传递</h2>
<table>
  <tr><th>传递方式</th><th>语法</th><th>说明</th></tr>
  <tr><td>值传递</td><td><code>void f(int x)</code></td><td>复制参数，函数内修改不影响原值</td></tr>
  <tr><td>引用传递</td><td><code>void f(int& x)</code></td><td>直接操作原变量，可修改</td></tr>
  <tr><td>const 引用</td><td><code>void f(const int& x)</code></td><td>只读访问，避免复制开销</td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int x = 10, y = 20;
swap(x, y);  // x=20, y=10</code></pre>
</div>

<h2>函数重载</h2>
<p>同一作用域内，同名函数可以有不同的参数列表：</p>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int max(int a, int b) {
    return (a > b) ? a : b;
}

double max(double a, double b) {
    return (a > b) ? a : b;
}

// 调用
max(3, 5);       // 调用 int 版本
max(3.14, 2.71); // 调用 double 版本</code></pre>
</div>

<h2>默认参数</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>void printInfo(std::string name, int age = 0, std::string city = "未知") {
    std::cout << name << ", " << age << "岁, " << city << std::endl;
}

printInfo("张三");                    // 张三, 0岁, 未知
printInfo("李四", 25);               // 李四, 25岁, 未知
printInfo("王五", 30, "北京");        // 王五, 30岁, 北京</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ 注意</div>
  <p>默认参数必须从右向左连续指定，不能跳过。</p>
</div>

<h2>内联函数</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>inline int square(int x) {
    return x * x;
}

// 编译器会将调用处展开为 x * x，减少函数调用开销
int y = square(5);  // 等价于 int y = 5 * 5;</code></pre>
</div>

<h2>Lambda 表达式 <span class="version-tag tag-cpp11">C++11</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 基本语法: [捕获列表](参数列表) -> 返回类型 { 函数体 }

// 1. 简单 Lambda
auto greet = []() {
    std::cout << "Hello!" << std::endl;
};
greet();

// 2. 带参数
auto add = [](int a, int b) -> int {
    return a + b;
};

// 3. 捕获外部变量
int factor = 2;
auto multiply = [factor](int x) {
    return x * factor;
};

// 4. 引用捕获（可修改外部变量）
int count = 0;
auto increment = [&count]() {
    count++;
};

// 5. 通用引用捕获
auto capture_all = [=]() { /* 复制所有外部变量 */ };
auto capture_ref = [&]() { /* 引用所有外部变量 */ };</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 Lambda 捕获方式</div>
  <p><code>[]</code> - 不捕获，<code>[=]</code> - 值捕获所有，<code>[&]</code> - 引用捕获所有，<code>[x]</code> - 值捕获x，<code>[&x]</code> - 引用捕获x，<code>[this]</code> - 捕获当前对象指针</p>
</div>
`
  },
  {
    id: "ch4",
    title: "第4章：数组与字符串",
    icon: "📊",
    summary: "数组、多维数组、C风格字符串与 std::string",
    version: "C++17",
    topics: ["数组", "string", "string_view"],
    content: `
<h2>数组基础</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 定义数组
int scores[5] = {85, 92, 78, 90, 88};
int numbers[] = {1, 2, 3, 4, 5};  // 编译器自动推断大小

// 访问元素
std::cout << scores[0];  // 第一个元素: 85
scores[2] = 80;           // 修改第三个元素

// 数组大小
int size = sizeof(scores) / sizeof(scores[0]);  // 5</code></pre>
</div>

<h2>多维数组</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 二维数组
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 访问
std::cout << matrix[1][2];  // 7

// 遍历
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        std::cout << matrix[i][j] << " ";
    }
    std::cout << std::endl;
}</code></pre>
</div>

<h2>C 风格字符串</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>char str1[] = "Hello";        // 字符数组
char str2[20] = "World";

// C 字符串操作（需要 <cstring>）
#include &lt;cstring&gt;

strlen(str1);      // 长度: 5
strcpy(str2, str1);  // 复制
strcat(str2, "!");   // 连接
strcmp(str1, str2);  // 比较</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ C 字符串的问题</div>
  <p>C 风格字符串容易出错（缓冲区溢出、忘记结尾的 \0）。现代 C++ 推荐使用 <code>std::string</code>。</p>
</div>

<h2>std::string</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;string&gt;

std::string s1 = "Hello";
std::string s2 = "World";

// 常用操作
s1 + " " + s2;           // 连接: "Hello World"
s1.length();            // 长度: 5
s1[0];                   // 访问: 'H'
s1.substr(0, 3);         // 子串: "Hel"
s1.find("ll");           // 查找: 返回位置 2
s1.replace(0, 2, "J");   // 替换: "Jlo"
s1.insert(5, "!");       // 插入: "Hello!"

// 比较
if (s1 == s2) { /* ... */ }
if (s1 < s2) { /* 字典序比较 */ }</code></pre>
</div>

<h2>std::string_view <span class="version-tag tag-cpp17">C++17</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp17">C++17</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;string_view&gt;

// string_view 是只读的字符串引用，不拷贝数据
void printString(std::string_view sv) {
    std::cout << sv << std::endl;
}

std::string str = "Hello World";
printString(str);           // 传入 string
printString("Literal");     // 传入字符串字面量

// 可以截取子串而不拷贝
std::string_view sub = std::string_view(str).substr(0, 5);</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 string_view 的优势</div>
  <p><code>string_view</code> 是轻量级引用，避免了字符串拷贝开销。适合只读场景，如函数参数。注意：不要保存指向临时对象的 string_view。</p>
</div>
`
  },
  {
    id: "ch5",
    title: "第5章：指针与引用",
    icon: "👉",
    summary: "指针基础、运算、引用以及 nullptr",
    version: "C++11",
    topics: ["指针", "引用", "nullptr"],
    content: `
<h2>指针基础</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int value = 42;
int* ptr = &value;    // ptr 存储 value 的地址

std::cout << ptr;     // 输出地址（十六进制）
std::cout << *ptr;    // 解引用: 输出 42

*ptr = 100;           // 通过指针修改值
// value 现在等于 100</code></pre>
</div>

<h2>指针运算</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int arr[] = {10, 20, 30, 40, 50};
int* p = arr;

*p;        // 10
*(p + 1);  // 20 (指针向后移动一个 int 的大小)
*(p + 2);  // 30
p++;       // p 指向下一个元素

// 指针减法
int* end = arr + 5;
size_t count = end - p;  // 两个指针间的元素个数</code></pre>
</div>

<h2>指针与数组</h2>
<p>数组名本质上是指向首元素的常量指针：</p>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int arr[5] = {1, 2, 3, 4, 5};
int* p = arr;  // 等价于 int* p = &arr[0];

// 以下等价
arr[2] == *(arr + 2) == *(p + 2) == p[2];  // 都等于 3

// 遍历数组
for (int* p = arr; p < arr + 5; p++) {
    std::cout << *p << " ";
}</code></pre>
</div>

<h2>引用</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int x = 10;
int& ref = x;   // ref 是 x 的别名

ref = 20;       // x 也变成 20
std::cout << x; // 输出 20

// 引用 vs 指针
// 1. 引用必须初始化，不能为 null
// 2. 引用一旦绑定不能改变
// 3. 使用引用语法更简洁，不需要解引用</code></pre>
</div>

<h2>nullptr <span class="version-tag tag-cpp11">C++11</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// C++11 前
int* p1 = NULL;    // 本质是宏 0，可能引发重载歧义
int* p2 = 0;

// C++11 推荐
int* p3 = nullptr;  // 类型安全的空指针

// nullptr 的类型是 std::nullptr_t
void foo(int x);
void foo(int* p);

foo(NULL);     // 歧义！可能调用 foo(int)
foo(nullptr);  // 明确调用 foo(int*)</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 左值引用 vs 右值引用</div>
  <p><code>int&</code> 是左值引用（绑定到可寻址的对象）。<code>int&&</code> 是右值引用（C++11，用于移动语义，详见第12章）。</p>
</div>
`
  },
  {
    id: "ch6",
    title: "第6章：动态内存与智能指针",
    icon: "🧠",
    summary: "new/delete、内存泄漏与 RAII 智能指针",
    version: "C++11",
    topics: ["new/delete", "智能指针", "RAII"],
    content: `
<h2>new / delete</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 分配单个对象
int* p = new int(42);   // 分配并初始化
std::cout << *p;        // 42
delete p;               // 释放内存

// 分配数组
int* arr = new int[100];   // 分配100个int
arr[0] = 1;
delete[] arr;              // 必须用 delete[]</code></pre>
</div>

<div class="callout danger">
  <div class="callout-icon">🚨 内存泄漏</div>
  <p>忘记 <code>delete</code> 会导致内存泄漏。异常发生时如果 delete 没执行，也会造成泄漏。现代 C++ 推荐使用智能指针。</p>
</div>

<h2>智能指针 <span class="version-tag tag-cpp11">C++11</span></h2>
<table>
  <tr><th>智能指针</th><th>头文件</th><th>所有权</th><th>用途</th></tr>
  <tr><td><code>unique_ptr</code></td><td><code>&lt;memory&gt;</code></td><td>独占</td><td>单一所有者资源</td></tr>
  <tr><td><code>shared_ptr</code></td><td><code>&lt;memory&gt;</code></td><td>共享</td><td>多个所有者资源</td></tr>
  <tr><td><code>weak_ptr</code></td><td><code>&lt;memory&gt;</code></td><td>弱引用</td><td>打破循环引用</td></tr>
</table>

<h3>unique_ptr</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;memory&gt;

// 创建
auto ptr = std::make_unique<int>(42);

// 访问
std::cout << *ptr;       // 42

// 转移所有权
auto ptr2 = std::move(ptr);  // ptr 现在为空
// ptr == nullptr

// 自定义删除器
auto file = std::unique_ptr&lt;FILE, decltype(&fclose)&gt;(
    fopen("data.txt", "r"), fclose
);

// 自动释放，无需手动 delete</code></pre>
</div>

<h3>shared_ptr</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>auto p1 = std::make_shared<int>(42);
{
    auto p2 = p1;  // 引用计数 +1
    std::cout << p1.use_count();  // 2
}  // p2 销毁，引用计数 -1

std::cout << p1.use_count();  // 1

// 循环引用问题
struct Node {
    std::shared_ptr<Node> next;  // 可能导致循环引用
};

// 解决：使用 weak_ptr
struct Node {
    std::weak_ptr<Node> next;
};</code></pre>
</div>

<h2>RAII 原则</h2>
<div class="callout tip">
  <div class="callout-icon">💡 RAII: Resource Acquisition Is Initialization</div>
  <p>资源获取即初始化。将资源管理绑定到对象的生命周期，构造函数获取资源，析构函数释放资源。这是 C++ 资源管理的核心哲学。</p>
</div>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class FileHandle {
    FILE* file;
public:
    FileHandle(const char* path, const char* mode) {
        file = fopen(path, mode);
        if (!file) throw std::runtime_error("打开失败");
    }
    ~FileHandle() {
        if (file) fclose(file);  // 确保释放
    }
    // 禁止拷贝
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
};

// 使用：无论正常返回还是异常，文件都会被关闭
void processFile() {
    FileHandle fh("data.txt", "r");
    // ... 处理文件
    if (some_error) throw std::exception();
    // fh 的析构函数会自动调用 fclose
}</code></pre>
</div>
`
  },
  {
    id: "ch7",
    title: "第7章：面向对象编程（OOP）",
    icon: "🏗️",
    summary: "类、对象、构造函数、析构函数与访问控制",
    version: "",
    topics: ["类", "构造函数", "封装"],
    content: `
<h2>类与对象</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Student {
public:           // 公有成员
    std::string name;
    int age;

    void study() {
        std::cout << name << " 正在学习" << std::endl;
    }
};

// 创建对象
Student stu;
stu.name = "张三";
stu.age = 20;
stu.study();</code></pre>
</div>

<h2>访问控制</h2>
<table>
  <tr><th>修饰符</th><th>含义</th><th>访问范围</th></tr>
  <tr><td><code>public</code></td><td>公有</td><td>任何地方可访问</td></tr>
  <tr><td><code>private</code></td><td>私有</td><td>仅类内部可访问</td></tr>
  <tr><td><code>protected</code></td><td>保护</td><td>类内部及子类可访问</td></tr>
</table>

<h2>构造函数与析构函数</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Rectangle {
    double width, height;
public:
    // 默认构造函数
    Rectangle() : width(0), height(0) {}

    // 带参数构造函数
    Rectangle(double w, double h) : width(w), height(h) {}

    // 拷贝构造函数
    Rectangle(const Rectangle& other) 
        : width(other.width), height(other.height) {}

    // 析构函数
    ~Rectangle() {
        std::cout << "Rectangle 被销毁" << std::endl;
    }

    double area() const {  // const 成员函数
        return width * height;
    }
};

// 创建对象的各种方式
Rectangle r1;              // 默认构造
Rectangle r2(3.0, 4.0);    // 参数构造
Rectangle r3 = r2;         // 拷贝构造
auto r4 = std::make_unique<Rectangle>(5.0, 6.0);</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 初始化列表</div>
  <p>构造函数的初始化列表 <code>: width(w), height(h)</code> 比在函数体内赋值效率更高，对于 const 成员和引用成员是必须的。</p>
</div>

<h2>this 指针</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Counter {
    int count;
public:
    Counter(int count) : count(count) {}  // 参数和成员同名

    Counter& increment() {
        this->count++;  // 明确指代成员变量
        return *this;    // 支持链式调用
    }
};

counter.increment().increment().increment();</code></pre>
</div>

<h2>静态成员</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Counter {
    static int instanceCount;  // 声明
public:
    Counter() { instanceCount++; }
    ~Counter() { instanceCount--; }
    static int getCount() { return instanceCount; }
};

int Counter::instanceCount = 0;  // 定义并初始化

// 访问
std::cout << Counter::getCount();  // 通过类名访问</code></pre>
</div>
`
  },
  {
    id: "ch8",
    title: "第8章：OOP进阶",
    icon: "🔮",
    summary: "继承、多态、虚函数、运算符重载与友元",
    version: "",
    topics: ["继承", "多态", "虚函数", "运算符重载"],
    content: `
<h2>继承</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Animal {
protected:
    std::string name;
public:
    Animal(const std::string& n) : name(n) {}
    void eat() { std::cout << name << " 在吃东西" << std::endl; }
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}
    void bark() { std::cout << name << " 汪汪!" << std::endl; }
};

Dog dog("旺财");
dog.eat();   // 继承自 Animal
dog.bark();  // Dog 自己的方法</code></pre>
</div>

<table>
  <tr><th>继承方式</th><th>public 成员</th><th>protected 成员</th><th>private 成员</th></tr>
  <tr><td><code>public</code></td><td>public</td><td>protected</td><td>不可访问</td></tr>
  <tr><td><code>protected</code></td><td>protected</td><td>protected</td><td>不可访问</td></tr>
  <tr><td><code>private</code></td><td>private</td><td>private</td><td>不可访问</td></tr>
</table>

<h2>多态与虚函数</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Shape {
public:
    virtual double area() const = 0;  // 纯虚函数
    virtual ~Shape() = default;       // 虚析构函数
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override {    // 重写
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override {
        return w * h;
    }
};

// 使用多态
std::unique_ptr<Shape> shape = std::make_unique<Circle>(5.0);
std::cout << shape->area();  // 调用 Circle::area()

shape = std::make_unique<Rectangle>(3.0, 4.0);
std::cout << shape->area();  // 调用 Rectangle::area()</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ 虚析构函数</div>
  <p>如果类有虚函数，析构函数必须声明为 <code>virtual</code>。否则通过基类指针 delete 派生类对象时，会导致资源泄漏。</p>
</div>

<h2>运算符重载</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Complex {
    double real, imag;
public:
    Complex(double r, double i) : real(r), imag(i) {}

    // 二元运算符
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    // 一元运算符
    Complex operator-() const {
        return Complex(-real, -imag);
    }

    // 复合赋值
    Complex& operator+=(const Complex& other) {
        real += other.real;
        imag += other.imag;
        return *this;
    }

    // 比较
    bool operator==(const Complex& other) const {
        return real == other.real && imag == other.imag;
    }

    // 输出运算符（友元）
    friend std::ostream& operator<<(std::ostream& os, const Complex& c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }
};

Complex a(1, 2), b(3, 4);
Complex c = a + b;  // 调用 operator+
std::cout << c;     // 调用友元 operator<<</code></pre>
</div>
`
  },
  {
    id: "ch9",
    title: "第9章：模板与泛型编程",
    icon: "🧬",
    summary: "函数模板、类模板、特化与可变参数模板",
    version: "C++11",
    topics: ["模板", "泛型", "auto", "decltype"],
    content: `
<h2>函数模板</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 函数模板
// 求两个值的最大值
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// 使用
int i = max(3, 5);           // T 推导为 int
double d = max(2.5, 3.7);    // T 推导为 double

// 显式指定类型
auto result = max<double>(3, 5.5);  // T = double</code></pre>
</div>

<h2>类模板</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>template<typename T, int Size>
class Array {
    T data[Size];
public:
    T& operator[](int index) { return data[index]; }
    int size() const { return Size; }
};

// 使用
Array<int, 100> intArray;
Array<double, 50> doubleArray;

intArray[0] = 42;
std::cout << intArray.size();  // 100</code></pre>
</div>

<h2>模板特化</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 通用模板
template<typename T>
class Printer {
public:
    void print(T value) { std::cout << value << std::endl; }
};

// 全特化：针对 bool 的特化版本
template<>
class Printer<bool> {
public:
    void print(bool value) {
        std::cout << (value ? "真" : "假") << std::endl;
    }
};

// 偏特化：针对指针类型的特化
template<typename T>
class Printer<T*> {
public:
    void print(T* ptr) {
        std::cout << "指针地址: " << ptr << std::endl;
    }
};</code></pre>
</div>

<h2>可变参数模板 <span class="version-tag tag-cpp11">C++11</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 递归展开参数包
template<typename T>
void print(T value) {
    std::cout << value << std::endl;
}

template<typename T, typename... Args>
void print(T value, Args... args) {
    std::cout << value << " ";
    print(args...);  // 递归调用
}

// 使用
print(1, 2.5, "hello", 'a');  // 输出: 1 2.5 hello a

// C++17 折叠表达式（更简洁）
template<typename... Args>
void print_all(Args... args) {
    (std::cout << ... << args) << std::endl;
}</code></pre>
</div>

<h2>类型推导</h2>
<table>
  <tr><th>关键字</th><th>作用</th><th>示例</th></tr>
  <tr><td><code>auto</code></td><td>自动推断变量类型</td><td><code>auto x = 42;</code></td></tr>
  <tr><td><code>decltype</code></td><td>获取表达式类型</td><td><code>decltype(x) y = 0;</code></td></tr>
  <tr><td><code>decltype(auto)</code></td><td>完美转发返回类型</td><td><code>C++14</code></td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>auto i = 42;           // int
auto d = 3.14;         // double
auto s = "hello";      // const char*
auto vec = std::vector<int>{1, 2, 3};  // std::vector<int>

// 用于迭代器
std::map<std::string, int> m;
for (auto it = m.begin(); it != m.end(); ++it) { /* ... */ }

// 范围 for 配合 auto
for (const auto& pair : m) { /* ... */ }</code></pre>
</div>
`
  },
  {
    id: "ch10",
    title: "第10章：标准模板库（STL）",
    icon: "📚",
    summary: "容器、迭代器、算法与函数对象",
    version: "C++11",
    topics: ["STL", "vector", "map", "算法"],
    content: `
<h2>STL 概述</h2>
<p>STL（Standard Template Library）是 C++ 标准库的核心组件，包含三大要素：</p>
<ul>
  <li><strong>容器</strong>：存储数据的类模板（vector, map, set 等）</li>
  <li><strong>迭代器</strong>：访问容器元素的通用接口</li>
  <li><strong>算法</strong>：操作数据的通用函数（sort, find 等）</li>
</ul>

<h2>常用容器</h2>

<h3>vector - 动态数组</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;vector&gt;

std::vector<int> vec = {1, 2, 3, 4, 5};

// 添加元素
vec.push_back(6);           // 尾部添加
vec.emplace_back(7);        // 原地构造（C++11，更高效）
vec.insert(vec.begin(), 0); // 头部插入

// 访问
vec[0];       // 不检查边界
vec.at(0);    // 检查边界，越界抛出异常
vec.front();  // 首元素
vec.back();   // 尾元素

// 容量
vec.size();      // 元素个数
vec.empty();     // 是否为空
vec.capacity();  // 当前容量
vec.reserve(100); // 预分配空间

// 遍历
for (size_t i = 0; i < vec.size(); i++) {
    std::cout << vec[i] << " ";
}

// 范围 for
for (int x : vec) { std::cout << x << " "; }</code></pre>
</div>

<h3>map - 有序键值对</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;map&gt;

std::map<std::string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 87;
scores.insert({"Charlie", 92});  // C++11 列表初始化

// 访问
std::cout << scores["Alice"];  // 95

// 检查键是否存在
if (scores.find("Dave") != scores.end()) {
    // 存在
}

// 遍历（按键排序）
for (const auto& [name, score] : scores) {  // C++17 结构化绑定
    std::cout << name << ": " << score << std::endl;
}</code></pre>
</div>

<h3>unordered_map - 哈希表</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;unordered_map&gt;

// 与 map 接口相同，但底层是哈希表
// 优点：插入/查找平均 O(1)
// 缺点：元素无序，不支持 lower_bound/upper_bound

std::unordered_map<std::string, int> hashmap;
hashmap.reserve(1000);  // 预分配桶数量，减少 rehash</code></pre>
</div>

<h2>迭代器</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>std::vector<int> vec = {1, 2, 3, 4, 5};

// 迭代器类型
std::vector<int>::iterator it;           // 可读可写
std::vector<int>::const_iterator cit;    // 只读

// 使用
for (auto it = vec.begin(); it != vec.end(); ++it) {
    *it *= 2;  // 每个元素乘 2
}

// C++11 辅助函数
auto it = std::begin(vec);   // 等价于 vec.begin()
auto end = std::end(vec);    // 等价于 vec.end()</code></pre>
</div>

<h2>算法</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;algorithm&gt;

std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};

// 排序
std::sort(vec.begin(), vec.end());                    // 升序
std::sort(vec.begin(), vec.end(), std::greater<int>()); // 降序

// 查找
auto it = std::find(vec.begin(), vec.end(), 5);
bool found = std::binary_search(vec.begin(), vec.end(), 5);  // 要求有序

// 最值
auto minmax = std::minmax_element(vec.begin(), vec.end());

// 变换
std::transform(vec.begin(), vec.end(), vec.begin(),
               [](int x) { return x * x; });

// 条件计数
int count = std::count_if(vec.begin(), vec.end(),
                          [](int x) { return x > 5; });

// 去重（需要先排序）
std::sort(vec.begin(), vec.end());
auto last = std::unique(vec.begin(), vec.end());
vec.erase(last, vec.end());</code></pre>
</div>
`
  },
  {
    id: "ch11",
    title: "第11章：异常处理",
    icon: "🛡️",
    summary: "try/catch/throw、标准异常与异常安全",
    version: "C++11",
    topics: ["异常", "try", "catch", "noexcept"],
    content: `
<h2>异常基础</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 抛出异常
void divide(int a, int b) {
    if (b == 0) {
        throw std::runtime_error("除数不能为0");
    }
    std::cout << a / b << std::endl;
}

// 捕获异常
try {
    divide(10, 0);
} catch (const std::runtime_error& e) {
    std::cout << "错误: " << e.what() << std::endl;
} catch (const std::exception& e) {
    // 捕获所有标准异常
    std::cout << "标准异常: " << e.what() << std::endl;
} catch (...) {
    // 捕获所有异常
    std::cout << "未知异常" << std::endl;
}</code></pre>
</div>

<h2>标准异常类层次</h2>
<table>
  <tr><th>异常类</th><th>头文件</th><th>用途</th></tr>
  <tr><td><code>std::exception</code></td><td><code>&lt;exception&gt;</code></td><td>基类</td></tr>
  <tr><td><code>std::runtime_error</code></td><td><code>&lt;stdexcept&gt;</code></td><td>运行时错误</td></tr>
  <tr><td><code>std::logic_error</code></td><td><code>&lt;stdexcept&gt;</code></td><td>逻辑错误</td></tr>
  <tr><td><code>std::invalid_argument</code></td><td><code>&lt;stdexcept&gt;</code></td><td>无效参数</td></tr>
  <tr><td><code>std::out_of_range</code></td><td><code>&lt;stdexcept&gt;</code></td><td>越界访问</td></tr>
  <tr><td><code>std::bad_alloc</code></td><td><code>&lt;new&gt;</code></td><td>内存分配失败</td></tr>
</table>

<h2>自定义异常</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class FileException : public std::runtime_error {
public:
    FileException(const std::string& msg) 
        : std::runtime_error(msg) {}
};

class NetworkException : public std::runtime_error {
    int errorCode;
public:
    NetworkException(const std::string& msg, int code)
        : std::runtime_error(msg), errorCode(code) {}
    int getCode() const { return errorCode; }
};

// 使用
throw FileException("无法打开文件: data.txt");</code></pre>
</div>

<h2>noexcept <span class="version-tag tag-cpp11">C++11</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 标记函数不抛出异常
void safeFunction() noexcept {
    // 如果这里抛出异常，程序会调用 std::terminate()
}

// 条件 noexcept
void func() noexcept(true);   // 不抛出
void func2() noexcept(false); // 可能抛出

// 常用于移动操作
class MyClass {
public:
    MyClass(MyClass&& other) noexcept;           // 移动构造
    MyClass& operator=(MyClass&& other) noexcept; // 移动赋值
};</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 异常安全保证</div>
  <p><strong>基本保证</strong>：异常发生后，对象处于有效但不确定的状态。<br><strong>强保证</strong>：异常发生后，对象状态回滚到操作前。<br><strong>不抛保证</strong>：操作绝不抛出异常（<code>noexcept</code>）。</p>
</div>
`
  },
  {
    id: "ch12",
    title: "第12章：现代C++特性",
    icon: "✨",
    summary: "C++11/14/17/20 核心新特性",
    version: "C++20",
    topics: ["移动语义", "结构化绑定", "Concepts", "协程"],
    content: `
<h2>初始化列表与统一初始化</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// C++11 统一初始化（花括号初始化）
int x{42};              // 避免窄化转换
double d = 3.14;
int y{d};               // 编译错误！double 转 int 是窄化转换

// 容器初始化
std::vector<int> vec{1, 2, 3, 4, 5};
std::map<std::string, int> m{{"a", 1}, {"b", 2}};

// 类成员初始化
class Point {
    int x{0};   // 类内默认初始化
    int y{0};
public:
    Point() = default;
    Point(int x, int y) : x{x}, y{y} {}
};</code></pre>
</div>

<h2>移动语义 <span class="version-tag tag-cpp11">C++11</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 左值 vs 右值
int x = 42;
int& lref = x;          // 左值引用
int&& rref = 100;       // 右值引用

// std::move 将左值转为右值引用
std::string s1 = "hello";
std::string s2 = std::move(s1);  // s1 的资源被转移给 s2
// s1 现在处于有效但不确定的状态

// 移动构造函数
class Buffer {
    char* data;
    size_t size;
public:
    // 拷贝构造
    Buffer(const Buffer& other) 
        : size(other.size), data(new char[size]) {
        std::copy(other.data, other.data + size, data);
    }

    // 移动构造
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;  // 置空源对象
        other.size = 0;
    }
};</code></pre>
</div>

<h2>完美转发 <span class="version-tag tag-cpp11">C++11</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 万能引用 + std::forward
template<typename T>
void wrapper(T&& arg) {  // T&& 是万能引用
    foo(std::forward<T>(arg));  // 保持值类别转发
}

// 使用
int x = 42;
wrapper(x);        // T = int&, 转发为左值
wrapper(42);       // T = int, 转发为右值
wrapper(std::move(x));  // 转发为右值</code></pre>
</div>

<h2>结构化绑定 <span class="version-tag tag-cpp17">C++17</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp17">C++17</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>std::pair<int, std::string> p = {1, "hello"};

// C++17 前
int id = p.first;
std::string name = p.second;

// C++17 结构化绑定
auto [id, name] = p;  // 自动解包

// 用于 map 遍历
std::map<std::string, int> scores;
for (const auto& [name, score] : scores) {
    std::cout << name << ": " << score << std::endl;
}

// 用于数组
int arr[3] = {1, 2, 3};
auto [a, b, c] = arr;</code></pre>
</div>

<h2>if/switch 初始化语句 <span class="version-tag tag-cpp17">C++17</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp17">C++17</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// C++17 前
auto it = m.find("key");
if (it != m.end()) {
    std::cout << it->second;
}

// C++17
if (auto it = m.find("key"); it != m.end()) {
    std::cout << it->second;
}  // it 在 if 外不可见

// switch 同理
switch (int x = getValue(); x) {
    case 1: /* ... */ break;
    case 2: /* ... */ break;
    default: /* ... */ break;
}</code></pre>
</div>

<h2>概念（Concepts）<span class="version-tag tag-cpp20">C++20</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 定义概念：要求类型支持加法
template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::same_as<T>;
};

// 使用概念约束模板
template<Addable T>
T add(T a, T b) {
    return a + b;
}

// 或者使用简写语法
template<typename T>
    requires Addable<T>
T add(T a, T b);

// auto 参数（简化模板）
auto add(Addable auto a, Addable auto b) {
    return a + b;
}</code></pre>
</div>

<h2>模块（Modules）<span class="version-tag tag-cpp20">C++20</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// math.cppm - 模块接口文件
export module math;

export int add(int a, int b) {
    return a + b;
}

export namespace math {
    int square(int x) { return x * x; }
}

// main.cpp - 使用模块
import math;

int main() {
    std::cout << add(2, 3) << std::endl;
    std::cout << math::square(4) << std::endl;
}</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 模块 vs 头文件</div>
  <p>模块替代了传统的头文件/宏包含模型，编译更快、无宏污染、更好的封装性。但需要编译器完整支持 C++20 模块。</p>
</div>
`
  },
  {
    id: "ch13",
    title: "第13章：文件操作与I/O",
    icon: "📁",
    summary: "文件读写、字符串流与格式化输出",
    version: "C++20",
    topics: ["fstream", "stringstream", "format"],
    content: `
<h2>文件读写</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;fstream&gt;
#include &lt;iostream&gt;

// 写入文件
std::ofstream outFile("data.txt");
if (outFile.is_open()) {
    outFile << "Hello, World!" << std::endl;
    outFile << 42 << " " << 3.14 << std::endl;
    outFile.close();
}

// 读取文件
std::ifstream inFile("data.txt");
if (inFile.is_open()) {
    std::string line;
    while (std::getline(inFile, line)) {
        std::cout << line << std::endl;
    }
    inFile.close();
}

// 追加模式
std::ofstream appendFile("data.txt", std::ios::app);
appendFile << "追加的内容" << std::endl;</code></pre>
</div>

<table>
  <tr><th>模式</th><th>说明</th></tr>
  <tr><td><code>std::ios::in</code></td><td>读取</td></tr>
  <tr><td><code>std::ios::out</code></td><td>写入（截断）</td></tr>
  <tr><td><code>std::ios::app</code></td><td>追加</td></tr>
  <tr><td><code>std::ios::binary</code></td><td>二进制模式</td></tr>
</table>

<h2>字符串流</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;sstream&gt;

// 字符串拼接
std::ostringstream oss;
oss << "Name: " << "张三" << ", Age: " << 25;
std::string result = oss.str();

// 字符串解析
std::string data = "100 3.14 hello";
std::istringstream iss(data);

int num;
double val;
std::string word;
iss >> num >> val >> word;  // num=100, val=3.14, word="hello"

// 类型转换
std::string s = "42";
int n = std::stoi(s);     // string to int
double d = std::stod("3.14");
std::string str = std::to_string(42);  // int to string</code></pre>
</div>

<h2>格式化输出 <span class="version-tag tag-cpp20">C++20</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;format&gt;

// 类似 Python 的 format
std::string s = std::format("Hello, {}!", "World");
// "Hello, World!"

std::string s2 = std::format("{0} + {1} = {2}", 1, 2, 3);
// "1 + 2 = 3"

// 格式化选项
std::string s3 = std::format("{:0>5}", 42);   // "00042" (补零)
std::string s4 = std::format("{:.2f}", 3.14159); // "3.14"
std::string s5 = std::format("{:x}", 255);    // "ff" (十六进制)

// 直接输出
std::cout << std::format("pi = {:.5f}", 3.1415926535);</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 C++20 前</div>
  <p>C++20 之前，格式化输出用 <code>printf</code> 或 <code>std::setw</code>/<code>std::setprecision</code> 操控符。C++20 的 <code>std::format</code> 更安全、类型安全且支持编译期检查。</p>
</div>
`
  },
  {
    id: "ch14",
    title: "第14章：高级主题",
    icon: "🚀",
    summary: "多线程、原子操作、类型转换与编译原理",
    version: "C++20",
    topics: ["多线程", "atomic", "类型转换", "编译"],
    content: `
<h2>多线程 <span class="version-tag tag-cpp11">C++11</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;thread&gt;
#include &lt;mutex&gt;
#include &lt;future&gt;
#include &lt;vector&gt;

// 基本线程
void task(int id) {
    std::cout << "线程 " << id << " 运行中" << std::endl;
}

std::thread t1(task, 1);
t1.join();  // 等待线程结束

// 互斥锁
std::mutex mtx;
int counter = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);  // RAII 自动加锁/解锁
    counter++;
}

// 异步任务
std::future<int> result = std::async(std::launch::async, []() {
    return 42 * 42;
});
std::cout << result.get();  // 1764</code></pre>
</div>

<h2>原子操作</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;atomic&gt;

std::atomic<int> atomic_counter{0};

// 无需互斥锁，线程安全
atomic_counter++;                    // 原子自增
atomic_counter.fetch_add(5);         // 原子加5
int old = atomic_counter.exchange(10); // 原子赋值，返回旧值

// CAS (Compare-And-Swap) - 无锁算法基础
int expected = 0;
bool success = atomic_counter.compare_exchange_strong(
    expected, 1  // 如果值是0，则设为1
);</code></pre>
</div>

<h2>类型转换</h2>
<table>
  <tr><th>转换</th><th>语法</th><th>用途</th></tr>
  <tr><td><code>static_cast</code></td><td><code>static_cast&lt;T&gt;(expr)</code></td><td>相关类型间转换</td></tr>
  <tr><td><code>dynamic_cast</code></td><td><code>dynamic_cast&lt;T&gt;(expr)</code></td><td>多态类型安全向下转换</td></tr>
  <tr><td><code>const_cast</code></td><td><code>const_cast&lt;T&gt;(expr)</code></td><td>添加/移除 const</td></tr>
  <tr><td><code>reinterpret_cast</code></td><td><code>reinterpret_cast&lt;T&gt;(expr)</code></td><td>底层位模式重解释</td></tr>
  <tr><td><code>C 风格</code></td><td><code>(T)expr</code></td><td>不推荐，过于宽泛</td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// static_cast
double d = 3.14;
int i = static_cast<int>(d);  // 截断小数

// dynamic_cast（多态类型）
class Base { virtual void foo() {} };
class Derived : public Base {};

Base* b = new Derived();
Derived* d2 = dynamic_cast<Derived*>(b);  // 安全向下转换
if (d2) { /* 转换成功 */ }

// const_cast
const int x = 10;
int* p = const_cast<int*>(&x);  // 移除 const
*p = 20;  // 未定义行为！不要修改 const 对象</code></pre>
</div>

<h2>预处理器与宏</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 条件编译
#ifdef DEBUG
    std::cout << "调试模式" << std::endl;
#endif

// 头文件保护
#ifndef MYHEADER_H
#define MYHEADER_H
// 头文件内容
#endif

// 宏定义
#define PI 3.14159
#define SQUARE(x) ((x) * (x))  // 注意括号

// C++ 推荐使用 const/constexpr 替代宏常量
constexpr double PI = 3.14159;

// 使用 inline 函数替代宏函数
template<typename T>
inline T square(T x) { return x * x; }</code></pre>
</div>

<h2>编译链接原理简述</h2>
<div class="callout note">
  <div class="callout-icon">📘 C++ 编译流程</div>
  <p><strong>预处理</strong>：处理 #include、#define 等 → <strong>编译</strong>：生成汇编代码 → <strong>汇编</strong>：生成目标文件(.o/.obj) → <strong>链接</strong>：合并目标文件和库，生成可执行文件</p>
</div>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 单文件编译
g++ main.cpp -o program

# 多文件分别编译再链接
g++ -c main.cpp -o main.o      # 编译
g++ -c utils.cpp -o utils.o    # 编译
g++ main.o utils.o -o program  # 链接

# 常用选项
# -std=c++20  指定标准版本
# -O2         优化级别
# -Wall       显示所有警告
# -g          生成调试信息
# -I./include 添加头文件搜索路径
# -l库名       链接库文件</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 学习建议</div>
  <p>恭喜完成 C++ 全栈教程！建议下一步：<br>1. 实践项目：实现一个个人项目（如文本编辑器、小游戏、网络工具）<br>2. 深入 STL 源码：阅读 SGI STL 或 libc++ 实现<br>3. 学习设计模式：在 C++ 中应用 23 种设计模式<br>4. 关注 C++23/C++26 新特性演进</p>
</div>
`
  }
];
