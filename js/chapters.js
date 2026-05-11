/* ===== C++ 全栈教程 - 章节内容 v2（含详细概念+练习） ===== */

const CHAPTERS = [
{"id": "ch0", "title": "第0章：准备工作", "icon": "🚀", "summary": "了解 C++ 语言，安装开发环境，编写第一个 Hello World 程序", "version": "", "topics": ["简介", "环境", "Hello World"], "content": `\n<h2>什么是 C++？</h2>\n<p>C++ 是一种通用的、编译型的编程语言，由 Bjarne Stroustrup 于 1979 年在贝尔实验室开发。它在 C 语言的基础上增加了<strong>面向对象编程</strong>、<strong>泛型编程</strong>和<strong>函数式编程</strong>等特性。</p>\n\n<div class=\"callout tip\">\n  <div class=\"callout-icon\">💡 为什么选择 C++？</div>\n  <p>C++ 兼具<strong>高性能</strong>和<strong>高级抽象能力</strong>，广泛应用于：</p>\n  <ul>\n    <li>操作系统（Windows/Linux/macOS 内核组件）</li>\n    <li>游戏开发（Unreal Engine、Unity 底层）</li>\n    <li>嵌入式系统（单片机、IoT 设备）</li>\n    <li>高性能计算（科学计算、图形渲染）</li>\n    <li>金融交易（高频交易系统）</li>\n    <li>浏览器引擎（Chrome V8、Firefox Quantum）</li>\n  </ul>\n</div>\n\n<h2>C++ 历史与标准版本</h2>\n<p>C++ 的发展经历了多个标准版本的迭代，每个版本都引入了重要的新特性：</p>\n<table>\n  <tr><th>版本</th><th>年份</th><th>主要特性</th></tr>\n  <tr><td>C++98</td><td>1998</td><td>第一个标准版本，奠定面向对象基础</td></tr>\n  <tr><td>C++03</td><td>2003</td><td>缺陷修复版，无重大新特性</td></tr>\n  <tr><td><span class=\"version-tag tag-cpp11\">C++11</span></td><td>2011</td><td>自动类型推导(auto)、Lambda、智能指针、范围for、nullptr</td></tr>\n  <tr><td><span class=\"version-tag tag-cpp14\">C++14</span></td><td>2014</td><td>泛型 Lambda、变量模板、改进的 auto、二进制字面量</td></tr>\n  <tr><td><span class=\"version-tag tag-cpp17\">C++17</span></td><td>2017</td><td>结构化绑定、if/switch初始化、filesystem、string_view</td></tr>\n  <tr><td><span class=\"version-tag tag-cpp20\">C++20</span></td><td>2020</td><td>概念(Concepts)、协程、模块(Modules)、范围库(Ranges)</td></tr>\n</table>\n\n<div class=\"callout note\">\n  <div class=\"callout-icon\">📘 编译器支持</div>\n  <p>GCC 8+ 支持大部分 C++17，GCC 10+ 支持大部分 C++20。Clang 和 MSVC 也类似。学习时建议使用最新版本的编译器。</p>\n</div>\n\n<h2>编译型语言 vs 解释型语言</h2>\n<p>C++ 是<strong>编译型语言</strong>，源代码需要通过编译器转换成机器码才能执行。这与 Python、JavaScript 等解释型语言有本质区别：</p>\n<table>\n  <tr><th>特性</th><th>C++（编译型）</th><th>Python（解释型）</th></tr>\n  <tr><td>执行速度</td><td>快（直接执行机器码）</td><td>慢（逐行解释）</td></tr>\n  <tr><td>开发效率</td><td>较低（需编译）</td><td>较高（直接运行）</td></tr>\n  <tr><td>类型检查</td><td>编译期严格检查</td><td>运行期检查</td></tr>\n  <tr><td>内存控制</td><td>手动/半自动</td><td>自动垃圾回收</td></tr>\n  <tr><td>可移植性</td><td>需重新编译</td><td>解释器支持即可</td></tr>\n</table>\n\n<h2>安装开发环境</h2>\n<p>推荐使用 <strong>VS Code</strong> + <strong>GCC/Clang</strong> 编译器：</p>\n\n<h3>Windows</h3>\n<ol>\n  <li>下载并安装 <a href=\"https://code.visualstudio.com/\" target=\"_blank\">VS Code</a></li>\n  <li>在 VS Code 中安装 \"C/C++\" 扩展（Microsoft 出品）</li>\n  <li>安装 MinGW-w64（推荐通过 MSYS2）：<code>pacman -S mingw-w64-ucrt-x86_64-gcc</code></li>\n  <li>将 MinGW 的 bin 目录添加到系统 PATH</li>\n</ol>\n\n<h3>macOS</h3>\n<ol>\n  <li>安装 Xcode Command Line Tools：<code>xcode-select --install</code></li>\n  <li>安装 VS Code 和 C/C++ 扩展</li>\n</ol>\n\n<h3>Linux (Ubuntu/Debian)</h3>\n<ol>\n  <li><code>sudo apt update && sudo apt install build-essential gdb</code></li>\n  <li>安装 VS Code 和 C/C++ 扩展</li>\n</ol>\n\n<div class=\"callout warning\">\n  <div class=\"callout-icon\">⚠️ 验证安装</div>\n  <p>安装完成后，在终端运行 <code>g++ --version</code>，应能看到类似 \"g++ (GCC) 13.x.x\" 的输出。</p>\n</div>\n\n<h2>第一个程序：Hello, World!</h2>\n<p>每一个 C++ 程序都必须包含一个 <code>main()</code> 函数，这是程序的入口点。</p>\n\n<div class=\"code-block\">\n  <div class=\"code-header\">\n    <div class=\"code-header-left\">\n      <span class=\"code-lang\">C++</span>\n    </div>\n    <div class=\"code-actions\">\n      <button class=\"code-btn copy-btn\">📋 复制</button>\n    </div>\n  </div>\n  <pre><code>#include &lt;iostream&gt;\n\nint main() {\n    std::cout << \"Hello, World!\" << std::endl;\n    return 0;\n}</code></pre>\n</div>\n\n<h3>逐行解析</h3>\n<table>\n  <tr><th>代码</th><th>含义</th></tr>\n  <tr><td><code>#include &lt;iostream&gt;</code></td><td>预处理指令，引入输入输出流库</td></tr>\n  <tr><td><code>int main()</code></td><td>主函数声明，程序从这里开始执行</td></tr>\n  <tr><td><code>std::cout</code></td><td>标准输出流对象（console）</td></tr>\n  <tr><td><code>&lt;&lt;</code></td><td>流插入运算符</td></tr>\n  <tr><td><code>std::endl</code></td><td>换行并刷新缓冲区</td></tr>\n  <tr><td><code>return 0</code></td><td>向操作系统返回0，表示成功</td></tr>\n</table>\n\n<h2>编译与运行流程</h2>\n<div class=\"code-block\">\n  <div class=\"code-header\">\n    <div class=\"code-header-left\"><span class=\"code-lang\">Bash</span></div>\n    <div class=\"code-actions\"><button class=\"code-btn copy-btn\">📋 复制</button></div>\n  </div>\n  <pre><code># 编译\n# g++ 是 GNU C++ 编译器\n# -o hello 指定输出文件名为 hello\n# -std=c++20 使用 C++20 标准（推荐）\n# -Wall 显示所有警告\n# -g 生成调试信息\ng++ hello.cpp -o hello -std=c++20 -Wall -g\n\n# 运行\n./hello          # Linux/macOS\nhello.exe        # Windows</code></pre>\n</div>\n\n<div class=\"callout tip\">\n  <div class=\"callout-icon\">💡 常见编译错误</div>\n  <p><strong>\"找不到 g++\"</strong>：编译器未安装或未加入 PATH。<br><strong>\"undefined reference\"</strong>：链接错误，通常是函数声明和定义不匹配。<br><strong>\"expected ; before...\"</strong>：语法错误，检查分号和括号匹配。</p>\n</div>\n`, "exercises": [{"type": "choice", "question": "C++ 是一种什么类型的语言？", "options": ["解释型语言", "编译型语言", "脚本语言", "标记语言"], "answer": "1"}, {"type": "truefalse", "question": "C++20 引入了 Concepts（概念）和 Coroutines（协程）特性。", "answer": "true"}, {"type": "fillblank", "question": "C++ 程序的入口函数是 ______ 函数。", "answer": "main"}, {"type": "output", "code": "#include <iostream>\nint main() {\n    std::cout << 2 + 3;\n    return 0;\n}", "options": ["2 + 3", "5", "23", "编译错误"], "answer": "1"}, {"type": "choice", "question": "以下哪个选项是 C++11 引入的特性？", "options": ["类(class)", "模板(template)", "auto 关键字", "构造函数"], "answer": "2"}]},
  {
    id: "ch1",
    title: "第1章：基础语法",
    icon: "📐",
    summary: "变量、数据类型、常量、运算符与基本的输入输出",
    topics: ["变量", "类型", "运算符", "IO"],
    content: `
<h2>程序结构</h2>
<p>C++ 程序由<strong>函数</strong>组成，每个程序必须有一个 <code>main()</code> 函数作为入口点。程序的基本结构如下：</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 单行注释：编译器会忽略 // 后面的内容
/* 多行注释：
   可以跨越多行 */

#include &lt;iostream&gt;  // 预处理指令：包含输入输出库

// 函数：一段可重复使用的代码
void greet() {
    std::cout << "你好!" << std::endl;
}

int main() {           // 主函数：程序从这里开始
    greet();           // 调用 greet 函数
    return 0;          // 返回 0 表示程序正常结束
}</code></pre>
</div>

<h3>语句与分号</h3>
<p>C++ 是<strong>语句驱动</strong>的语言，每条语句以分号 <code>;</code> 结束。忘记分号是最常见的编译错误之一。</p>

<div class="callout warning">
  <div class="callout-icon">⚠️ 常见错误</div>
  <p><code>return 0</code> 需要分号，但 <code>#include</code> 和函数定义的大括号后面<strong>不需要</strong>分号。</p>
</div>

<h2>变量与数据类型</h2>
<p><strong>变量</strong>是内存中的一个命名存储位置。每个变量都有<strong>类型</strong>，类型决定了变量能存储什么数据以及占用多少内存。</p>

<table>
  <tr><th>类型</th><th>说明</th><th>示例</th><th>通常大小</th></tr>
  <tr><td><code>int</code></td><td>整数（-2^31 ~ 2^31-1）</td><td><code>int age = 20;</code></td><td>4 字节</td></tr>
  <tr><td><code>short</code></td><td>短整数</td><td><code>short s = 100;</code></td><td>2 字节</td></tr>
  <tr><td><code>long</code></td><td>长整数</td><td><code>long l = 1000000L;</code></td><td>4/8 字节</td></tr>
  <tr><td><code>long long</code></td><td>长长整数</td><td><code>long long ll = 1e18;</code></td><td>8 字节</td></tr>
  <tr><td><code>float</code></td><td>单精度浮点数（约6位有效数字）</td><td><code>float pi = 3.14f;</code></td><td>4 字节</td></tr>
  <tr><td><code>double</code></td><td>双精度浮点数（约15位有效数字）</td><td><code>double e = 2.71828;</code></td><td>8 字节</td></tr>
  <tr><td><code>char</code></td><td>单个字符（-128~127）</td><td><code>char c = 'A';</code></td><td>1 字节</td></tr>
  <tr><td><code>bool</code></td><td>布尔值（true/false）</td><td><code>bool flag = true;</code></td><td>1 字节</td></tr>
  <tr><td><code>void</code></td><td>无类型（用于函数返回值）</td><td><code>void foo();</code></td><td>无</td></tr>
</table>

<div class="callout note">
  <div class="callout-icon">📘 类型大小</div>
  <p>类型的具体大小取决于平台。使用 <code>sizeof(int)</code> 可以在编译期获取类型的实际字节数。C++ 标准只规定了最小大小，例如 <code>sizeof(int) >= 2</code>。</p>
</div>

<h3>auto 类型推导 <span class="version-tag tag-cpp11">C++11</span></h3>
<p><code>auto</code> 关键字让编译器自动推断变量的类型，这在类型名很长时特别有用。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>auto i = 42;        // int
auto d = 3.14;      // double
auto s = "hello";    // const char*
auto b = true;      // bool

// 在复杂类型中特别有用
std::vector<std::pair<int, std::string>> data;
for (auto it = data.begin(); it != data.end(); ++it) {  // auto 推导为迭代器类型
    // ...
}</code></pre>
</div>

<h2>常量</h2>
<p>常量是不可修改的值。C++ 提供了多种定义常量的方式：</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>const int MAX_SIZE = 100;        // 运行时常量：值在运行时确定
constexpr int MIN_SIZE = 10;    // 编译期常量：值必须在编译期确定

// constexpr 函数
constexpr int square(int x) {
    return x * x;
}
constexpr int AREA = square(5);  // AREA = 25，编译期计算

// 编译期常量可用于数组大小
int arr1[MAX_SIZE];   // OK（C++ 变长数组扩展）
int arr2[MIN_SIZE];   // 标准 C++ 中 OK

// 字面常量
42        // int 字面量
3.14      // double 字面量
3.14f     // float 字面量
'a'       // char 字面量
"hello"   // const char* 字面量
true      // bool 字面量
nullptr   // 空指针字面量（C++11）</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 const vs constexpr</div>
  <p><code>const</code> 表示只读，值可以在运行时确定。<code>constexpr</code> 表示编译期常量，值必须在编译期就能算出。能用 <code>constexpr</code> 的地方优先用，性能更好。</p>
</div>

<h2>运算符</h2>
<p>运算符用于对数据进行操作。C++ 的运算符非常丰富：</p>

<table>
  <tr><th>类别</th><th>运算符</th><th>说明</th><th>优先级</th></tr>
  <tr><td>算术</td><td><code>+ - * / %</code></td><td>加、减、乘、除、取模</td><td>高</td></tr>
  <tr><td>关系</td><td><code>== != > < >= <=</code></td><td>等于、不等于、大于、小于</td><td>中</td></tr>
  <tr><td>逻辑</td><td><code>&& || !</code></td><td>与、或、非</td><td>低</td></tr>
  <tr><td>位运算</td><td><code>& | ^ ~ << >></code></td><td>按位与、或、异或、取反、左移、右移</td><td>高</td></tr>
  <tr><td>赋值</td><td><code>= += -= *= /= %=</code></td><td>赋值及复合赋值</td><td>最低</td></tr>
  <tr><td>自增自减</td><td><code>++ --</code></td><td>前缀/后缀自增自减</td><td>最高</td></tr>
  <tr><td>条件</td><td><code>? :</code></td><td>三元运算符</td><td>低</td></tr>
</table>

<h3>前缀 vs 后缀自增</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int x = 5;
int a = ++x;   // 先增1再赋值：x=6, a=6
int b = x++;   // 先赋值再增1：b=6, x=7

// 建议：单独使用时用哪个都行
// 但在表达式中尽量拆成多行，避免混淆</code></pre>
</div>

<h2>输入输出（I/O）</h2>
<p>C++ 使用 <code>&lt;iostream&gt;</code> 库进行标准输入输出。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    // 标准输出
    std::cout << "Hello" << std::endl;  // endl = 换行 + 刷新
    std::cout << "World\n";             // \n 只是换行

    int age;
    std::string name;

    // 标准输入（遇到空白符停止）
    std::cout << "请输入你的名字: ";
    std::cin >> name;           // 读取一个单词

    std::cout << "请输入你的年龄: ";
    std::cin >> age;            // 读取整数

    // 读取整行（包含空格）
    std::cin.ignore();         // 清除缓冲区中的换行符
    std::cout << "请输入一句话: ";
    std::getline(std::cin, name);

    // 格式化输出
    std::cout << "你好, " << name << "! 你今年 " << age << " 岁。" << std::endl;

    return 0;
}</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 输入技巧</div>
  <p><code>std::cin >> variable</code> 遇到空格就会停止。要读取一整行用 <code>std::getline()</code>。混合使用 <code>cin >></code> 和 <code>getline()</code> 时，中间需要调用 <code>cin.ignore()</code> 清除残留的换行符。</p>
</div>
`,
    exercises: [{"type": "choice", "question": "以下哪个类型占用内存最小？", "options": ["int", "float", "char", "double"], "answer": "2"}, {"type": "truefalse", "question": "const 和 constexpr 的区别在于 constexpr 必须在编译期就能计算出值。", "answer": "true"}, {"type": "output", "code": "int main() {\n    int a = 5;\n    int b = a++;\n    std::cout << b;\n    return 0;\n}", "options": ["5", "6", "4", "编译错误"], "answer": "0"}, {"type": "fillblank", "question": "C++11 引入的自动类型推导关键字是 ______。", "answer": "auto"}, {"type": "choice", "question": "以下运算符优先级最高的是？", "options": ["+", "&&", "++", "="], "answer": "2"}, {"type": "output", "code": "int main() {\n    int x = 10;\n    int y = x / 3;\n    std::cout << y;\n    return 0;\n}", "options": ["3.33", "3", "4", "编译错误"], "answer": "1"}]
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
<p>程序需要根据条件做出不同的决策，C++ 提供了多种条件判断结构。</p>

<h3>if / else / else if</h3>
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

// 单语句可省略大括号（不推荐）
if (score > 0)
    std::cout << "正数" << std::endl;
else
    std::cout << "非正数" << std::endl;</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ 悬空 else 问题</div>
  <p><code>else</code> 总是与最近的未匹配的 <code>if</code> 配对。建议始终使用大括号，即使只有一条语句。</p>
</div>

<h3>switch 语句</h3>
<p><code>switch</code> 用于根据一个整型表达式的值选择执行路径。比多层 <code>if-else</code> 更清晰。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int day = 3;

switch (day) {
    case 1:
        std::cout << "星期一" << std::endl;
        break;  // 必须有 break，否则会"贯穿"到下一个 case
    case 2:
        std::cout << "星期二" << std::endl;
        break;
    case 3:
        std::cout << "星期三" << std::endl;
        break;
    case 4:
    case 5:
        std::cout << "周四或周五" << std::endl;
        break;  // 多个 case 共享代码
    default:
        std::cout << "周末或其他" << std::endl;
        break;
}</code></pre>
</div>

<div class="callout danger">
  <div class="callout-icon">🚨 忘记 break</div>
  <p>忘记写 <code>break</code> 会导致"贯穿"（fall-through），程序会继续执行下一个 case 的代码。这是 switch 最常见的 bug 来源。C++17 的 <code>[[fallthrough]]</code> 属性可以显式标记故意贯穿。</p>
</div>

<h3>三元运算符</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 语法: 条件 ? 表达式1 : 表达式2
int a = 10, b = 20;
int max = (a > b) ? a : b;  // max = 20

// 嵌套三元运算符（可读性差，不推荐嵌套超过一层）
std::string grade = (score >= 90) ? "A" :
                    (score >= 80) ? "B" :
                    (score >= 60) ? "C" : "D";</code></pre>
</div>

<h2>循环</h2>
<p>循环用于重复执行一段代码。C++ 提供了三种基本循环结构。</p>

<h3>for 循环</h3>
<p>最适合已知循环次数的场景。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 基本 for 循环
for (int i = 0; i < 10; i++) {
    std::cout << i << " ";
}
// 输出: 0 1 2 3 4 5 6 7 8 9

// 可以省略某些部分
int j = 0;
for (; j < 10; ) {
    std::cout << j++ << " ";
}

// 逗号表达式（多变量）
for (int i = 0, j = 10; i < j; i++, j--) {
    std::cout << i << "," << j << " ";
}</code></pre>
</div>

<h3>范围 for 循环 <span class="version-tag tag-cpp11">C++11</span></h3>
<p>遍历容器或数组的简洁写法。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>std::vector<int> nums = {1, 2, 3, 4, 5};

// 值拷贝（不能修改原数组）
for (int n : nums) {
    n *= 2;  // 修改的是拷贝，不影响 nums
}

// 引用（可修改原数组）
for (int& n : nums) {
    n *= 2;  // nums 中的每个元素都翻倍
}

// const 引用（只读，效率最高）
for (const int& n : nums) {
    std::cout << n << " ";  // 不拷贝，不修改
}

// auto 自动推导
for (auto& n : nums) {
    n *= 2;
}</code></pre>
</div>

<h3>while / do-while</h3>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// while: 先判断条件，可能一次都不执行
int i = 0;
while (i < 5) {
    std::cout << i << " ";
    i++;
}

// do-while: 先执行一次，再判断条件
int j = 0;
do {
    std::cout << j << " ";
    j++;
} while (j < 5);

// do-while 的经典用法：用户输入验证
int choice;
do {
    std::cout << "请输入 1-3: ";
    std::cin >> choice;
} while (choice < 1 || choice > 3);</code></pre>
</div>

<h2>跳转语句</h2>
<table>
  <tr><th>语句</th><th>作用</th><th>使用场景</th></tr>
  <tr><td><code>break</code></td><td>跳出当前循环或 switch</td><td>提前终止循环、switch 分支结束</td></tr>
  <tr><td><code>continue</code></td><td>跳过本次循环剩余部分</td><td>跳过某些元素继续循环</td></tr>
  <tr><td><code>return</code></td><td>从函数返回</td><td>函数结束、返回结果</td></tr>
  <tr><td><code>goto</code></td><td>跳转到标签</td><td>现代 C++ 几乎不用，可读性差</td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// break 示例：找到第一个负数就停止
for (int n : {1, 2, 3, -4, 5, -6}) {
    if (n < 0) {
        std::cout << "找到负数: " << n << std::endl;
        break;
    }
}

// continue 示例：跳过偶数，只处理奇数
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;  // 偶数跳过
    std::cout << i << " ";      // 只输出奇数
}</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 循环选择建议</div>
  <p>知道循环次数用 <strong>for</strong>；条件驱动用 <strong>while</strong>；至少执行一次用 <strong>do-while</strong>；遍历容器用 <strong>范围 for</strong>。</p>
</div>
`,
    exercises: [{"type": "choice", "question": "以下代码输出什么？for(int i=0; i<3; i++) cout << i;", "options": ["012", "123", "0123", "编译错误"], "answer": "0"}, {"type": "truefalse", "question": "switch 语句中，case 后面必须加 break。", "answer": "false"}, {"type": "fillblank", "question": "C++11 引入的用于遍历容器的新循环语法叫做 ______ for。", "answer": "范围"}, {"type": "output", "code": "int i = 0;\nwhile (i < 3) {\n    i++;\n}\nstd::cout << i;", "options": ["2", "3", "4", "死循环"], "answer": "1"}, {"type": "choice", "question": "do-while 和 while 的主要区别是？", "options": ["do-while 效率更高", "do-while 至少执行一次", "while 可以无限循环", "没有区别"], "answer": "1"}]
  },
  {
    id: "ch3",
    title: "第3章：函数",
    icon: "⚙️",
    summary: "函数定义、参数传递、重载、默认参数、Lambda 表达式",
    version: "C++11",
    topics: ["函数", "重载", "Lambda"],
    content: `
<h2>函数定义与调用</h2>
<p><strong>函数</strong>是一段完成特定任务的代码块，可以被重复调用。函数由<strong>声明</strong>（告诉编译器函数存在）和<strong>定义</strong>（实现函数逻辑）组成。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 函数声明（原型）
// 告诉编译器：有一个叫 add 的函数，接受两个 int，返回 int
int add(int a, int b);

// 函数定义
int add(int a, int b) {
    return a + b;  // 返回两数之和
}

// 主函数中调用
int main() {
    int result = add(3, 5);  // result = 8
    std::cout << result << std::endl;
    return 0;
}</code></pre>
</div>

<h3>函数调用栈</h3>
<p>每次调用函数时，程序会在<strong>调用栈</strong>上分配一段内存（栈帧），存储参数、局部变量和返回地址。函数返回时，栈帧被销毁。</p>

<div class="callout note">
  <div class="callout-icon">📘 递归与栈溢出</div>
  <p>递归调用过深或局部变量过大可能导致<strong>栈溢出</strong>（stack overflow）。现代 C++ 提倡用迭代替代递归，或用尾递归优化。</p>
</div>

<h2>参数传递</h2>
<p>C++ 有三种参数传递方式，理解它们的区别至关重要：</p>

<table>
  <tr><th>传递方式</th><th>语法</th><th>原变量是否可修改</th><th>拷贝开销</th></tr>
  <tr><td>值传递</td><td><code>void f(int x)</code></td><td>否（修改的是副本）</td><td>复制整个对象</td></tr>
  <tr><td>引用传递</td><td><code>void f(int& x)</code></td><td>是</td><td>无拷贝</td></tr>
  <tr><td>const 引用</td><td><code>void f(const int& x)</code></td><td>否</td><td>无拷贝</td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>void byValue(int x) { x = 100; }     // 修改的是副本
void byRef(int& x) { x = 100; }      // 修改原变量
void byConstRef(const int& x) { }    // 只读，无拷贝

int a = 10;
byValue(a);      // a 仍然是 10
byRef(a);        // a 变成 100

// 大对象用 const 引用避免拷贝
std::string bigStr(10000, 'a');
void process(const std::string& s);  // 高效且安全</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 参数传递建议</div>
  <p>基本类型（int, double, char, bool）用<strong>值传递</strong>；大对象（string, vector）用<strong>const 引用</strong>；需要修改原变量用<strong>引用传递</strong>。</p>
</div>

<h2>函数重载</h2>
<p><strong>函数重载</strong>允许在同一作用域内定义同名函数，只要它们的<strong>参数列表</strong>不同（参数类型、个数或顺序不同）。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 重载函数：同名不同参数
int max(int a, int b) {
    return (a > b) ? a : b;
}

double max(double a, double b) {
    return (a > b) ? a : b;
}

std::string max(const std::string& a, const std::string& b) {
    return (a > b) ? a : b;  // 字符串比较
}

// 调用时编译器自动选择最匹配的版本
max(3, 5);          // int 版本
max(3.14, 2.71);    // double 版本
max("abc", "def");  // string 版本</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ 重载规则</div>
  <p>返回值类型不同<strong>不能</strong>构成重载。例如 <code>int f()</code> 和 <code>double f()</code> 不能同时存在。</p>
</div>

<h2>默认参数</h2>
<p>函数参数可以指定<strong>默认值</strong>，调用时如果省略该参数，就使用默认值。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>void printInfo(std::string name, int age = 0, std::string city = "未知") {
    std::cout << name << ", " << age << "岁, " << city << std::endl;
}

printInfo("张三");                 // 张三, 0岁, 未知
printInfo("李四", 25);            // 李四, 25岁, 未知
printInfo("王五", 30, "北京");     // 王五, 30岁, 北京

// ❌ 错误：不能跳过中间参数
// printInfo("赵六", "上海");</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ 默认参数规则</div>
  <p>默认参数必须从<strong>右向左</strong>连续指定。声明和定义不能同时指定默认值（通常在声明中指定）。</p>
</div>

<h2>内联函数</h2>
<p><strong>内联函数</strong>建议编译器将函数调用处展开为函数体，减少函数调用开销（保存寄存器、跳转、返回等）。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 内联函数建议编译器展开
inline int square(int x) {
    return x * x;
}

// 编译器可能将调用展开
int y = square(5);  // 可能优化为: int y = 5 * 5;

// 现代编译器会自动内联小函数，inline 关键字更多是链接层面的作用
// 类成员函数在类定义内直接实现，隐式内联</code></pre>
</div>

<h2>Lambda 表达式 <span class="version-tag tag-cpp11">C++11</span></h2>
<p><strong>Lambda</strong> 是匿名函数，可以在需要函数对象的地方就地定义。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// Lambda 语法: [捕获](参数) -> 返回类型 { 函数体 }

// 1. 无参数无捕获
auto greet = []() { std::cout << "Hello!" << std::endl; };
greet();

// 2. 带参数
auto add = [](int a, int b) -> int { return a + b; };

// 3. 捕获外部变量（值捕获）
int factor = 2;
auto multiply = [factor](int x) { return x * factor; };
// factor 被拷贝到 Lambda 内部

// 4. 引用捕获（可修改外部变量）
int count = 0;
auto increment = [&count]() { count++; };
increment();  // count = 1

// 5. 隐式捕获
[=]()  { /* 值捕获所有可见变量 */ };
[&]()  { /* 引用捕获所有可见变量 */ };
[=, &x]() { /* 默认值捕获，但 x 引用捕获 */ };

// 6. 泛型 Lambda（C++14）
auto generic = [](auto a, auto b) { return a + b; };
generic(1, 2);       // int
generic(1.5, 2.5);   // double</code></pre>
</div>

<table>
  <tr><th>捕获方式</th><th>语法</th><th>含义</th></tr>
  <tr><td>空捕获</td><td><code>[]</code></td><td>不捕获任何外部变量</td></tr>
  <tr><td>值捕获</td><td><code>[x]</code></td><td>拷贝 x 到 Lambda</td></tr>
  <tr><td>引用捕获</td><td><code>[&x]</code></td><td>引用 x，可修改原变量</td></tr>
  <tr><td>隐式值捕获</td><td><code>[=]</code></td><td>拷贝所有外部变量</td></tr>
  <tr><td>隐式引用捕获</td><td><code>[&]</code></td><td>引用所有外部变量</td></tr>
  <tr><td>混合捕获</td><td><code>[=, &x]</code></td><td>默认拷贝，x 引用</td></tr>
  <tr><td>this 捕获</td><td><code>[this]</code></td><td>捕获当前对象指针</td></tr>
</table>

<div class="callout tip">
  <div class="callout-icon">💡 Lambda 使用场景</div>
  <p>Lambda 常用于 STL 算法（sort、find_if）、回调函数、线程函数。它比传统函数对象更简洁，比函数指针更强大。</p>
</div>
`,
    exercises: [{"type": "choice", "question": "以下哪种参数传递方式可以修改原变量的值？", "options": ["值传递", "const 引用", "引用传递", "以上都不行"], "answer": "2"}, {"type": "truefalse", "question": "函数返回值类型不同可以构成函数重载。", "answer": "false"}, {"type": "fillblank", "question": "Lambda 表达式中，[=] 表示对可见变量进行 ______ 捕获。", "answer": "值"}, {"type": "output", "code": "void f(int x) { x = 5; }\nint main() {\n    int a = 10;\n    f(a);\n    std::cout << a;\n    return 0;\n}", "options": ["5", "10", "编译错误", "未定义"], "answer": "1"}, {"type": "choice", "question": "默认参数必须从哪个方向连续指定？", "options": ["从左到右", "从右到左", "任意方向", "不需要连续"], "answer": "1"}]
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
<p><strong>数组</strong>是相同类型元素的连续内存块。数组的大小在编译期确定，不能动态改变。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 定义数组
int scores[5] = {85, 92, 78, 90, 88};  // 5个整数
int numbers[] = {1, 2, 3, 4, 5};        // 编译器自动推断大小为5
int zeros[10] = {0};                     // 全部初始化为0
int empty[10];                           // 未初始化（值不确定！）

// 访问元素（索引从0开始）
std::cout << scores[0];  // 第一个元素: 85
scores[2] = 80;           // 修改第三个元素

// 数组大小
int size = sizeof(scores) / sizeof(scores[0]);  // 20/4 = 5

// C++11 获取数组大小
int arr[] = {1, 2, 3, 4, 5};
std::cout << std::size(arr);  // 5 (C++17)
std::cout << sizeof(arr)/sizeof(arr[0]);  // 通用方法</code></pre>
</div>

<div class="callout danger">
  <div class="callout-icon">🚨 数组越界</div>
  <p>C++ <strong>不会检查</strong>数组越界！访问 <code>scores[10]</code> 不会报错，但会导致<strong>未定义行为</strong>（可能崩溃、数据损坏或看似正常）。务必确保索引在有效范围内。</p>
</div>

<h2>多维数组</h2>
<p>多维数组是数组的数组，在内存中按行优先连续存储。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 二维数组（3行4列）
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// 访问
std::cout << matrix[1][2];  // 第2行第3列: 7

// 遍历
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        std::cout << matrix[i][j] << " ";
    }
    std::cout << std::endl;
}

// 三维数组
int cube[2][3][4];  // 2层3行4列

// 内存布局：行优先
// matrix[0][0], matrix[0][1], ..., matrix[0][3],
// matrix[1][0], matrix[1][1], ..., matrix[1][3], ...</code></pre>
</div>

<h2>数组与指针</h2>
<p>数组名本质上是指向首元素的<strong>常量指针</strong>。数组和指针在很多场景下可以互换使用。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int arr[5] = {10, 20, 30, 40, 50};
int* p = arr;  // 等价于 int* p = &arr[0];

// 以下等价
arr[2] == *(arr + 2) == *(p + 2) == p[2];  // 都等于 30

// 指针算术
p++;        // p 指向 arr[1]
p += 2;     // p 指向 arr[3]

// 遍历数组
for (int* p = arr; p < arr + 5; p++) {
    std::cout << *p << " ";
}

// 数组名是常量指针，不能修改
// arr++;  // ❌ 编译错误！</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ sizeof 的区别</div>
  <p><code>sizeof(arr)</code> 返回整个数组的字节数（20），而 <code>sizeof(p)</code> 返回指针的大小（8 字节，64位系统）。这是数组和指针的重要区别。</p>
</div>

<h2>C 风格字符串</h2>
<p>C 风格字符串是以 <code>'\0'</code>（空字符）结尾的 <code>char</code> 数组。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>char str1[] = "Hello";       // 自动分配6字节（含'\0'）
char str2[20] = "World";
char str3[6] = {'H', 'e', 'l', 'l', 'o', '\0'};

// C 字符串操作（<cstring> 头文件）
#include &lt;cstring&gt;

strlen(str1);           // 长度: 5（不计'\0'）
strcpy(str2, str1);     // 复制（危险！目标必须足够大）
strncpy(str2, str1, sizeof(str2)-1);  // 安全复制
strcat(str2, "!");      // 连接（同样危险）
strcmp(str1, str2);     // 比较：相等返回0

// 更安全的版本（C11）
strcpy_s(str2, sizeof(str2), str1);  // 微软扩展，非标准</code></pre>
</div>

<div class="callout danger">
  <div class="callout-icon">🚨 缓冲区溢出</div>
  <p>C 字符串操作（strcpy, strcat）是<strong>缓冲区溢出</strong>的主要来源。现代 C++ 应优先使用 <code>std::string</code>。如果必须用 C 字符串，使用 <code>strncpy</code> 并确保目标足够大。</p>
</div>

<h2>std::string</h2>
<p><code>std::string</code> 是 C++ 标准库提供的动态字符串类，安全且功能丰富。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;string&gt;

// 创建
std::string s1 = "Hello";
std::string s2("World");
std::string s3(5, 'a');       // "aaaaa"

// 常用操作
s1 + " " + s2;                // 连接: "Hello World"
s1.append("!");               // 追加
s1.length();  s1.size();      // 长度: 5
s1[0];  s1.at(0);             // 访问: 'H'（at会检查越界）
s1.substr(0, 3);             // 子串: "Hel"
s1.find("ll");                // 查找: 返回位置 2，找不到返回 npos
s1.find("xyz");               // 返回 string::npos
s1.replace(0, 2, "J");        // 替换: "Jlo"
s1.insert(5, "!");           // 插入: "Hello!"
s1.erase(0, 2);              // 删除: 删除前2个字符
s1.clear();                  // 清空
s1.empty();                  // 是否为空

// 比较
if (s1 == s2) { /* ... */ }
if (s1 < s2) { /* 字典序比较 */ }

// C++11 原始字符串（保留换行和特殊字符）
std::string json = R"({"name": "张三", "age": 25})";</code></pre>
</div>

<h2>std::string_view <span class="version-tag tag-cpp17">C++17</span></h2>
<p><code>string_view</code> 是字符串的<strong>只读引用</strong>，不拥有数据，只持有指针和长度。避免了不必要的字符串拷贝。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp17">C++17</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;string_view&gt;

// 创建 string_view（不拷贝数据！）
std::string str = "Hello World";
std::string_view sv1 = str;              // 引用 str
std::string_view sv2 = "Literal";         // 引用字符串字面量

// 只读操作
std::cout << sv1.length();    // 11
std::cout << sv1[0];          // 'H'
auto sub = sv1.substr(0, 5);  // 截取（不拷贝！）

// 作为函数参数：高效且通用
void printString(std::string_view sv) {
    std::cout << sv << std::endl;
}

printString(str);          // 传入 string
printString("Literal");    // 传入字面量
printString(sv1);          // 传入 string_view

// ⚠️ 注意：string_view 不拥有数据
// 不要保存指向临时对象的 string_view
std::string_view dangling() {
    std::string s = "temp";
    return std::string_view(s);  // ❌ s 销毁后，返回悬空引用
}</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 string 性能建议</div>
  <p>函数参数用 <code>std::string_view</code>（只读）或 <code>const std::string&</code>；返回值用 <code>std::string</code>（移动语义会优化拷贝）；需要修改时用 <code>std::string&</code>。</p>
</div>
`,
    exercises: [{"type": "choice", "question": "int arr[5] 的有效索引范围是？", "options": ["0-4", "1-5", "0-5", "1-4"], "answer": "0"}, {"type": "truefalse", "question": "数组名是一个指向首元素的常量指针。", "answer": "true"}, {"type": "fillblank", "question": "C++17 引入的轻量级字符串引用类型是 ______。", "answer": "string_view"}, {"type": "output", "code": "int arr[] = {1, 2, 3};\nint* p = arr;\nstd::cout << *(p + 1);", "options": ["1", "2", "3", "编译错误"], "answer": "1"}, {"type": "choice", "question": "std::string 的哪个操作会检查越界并抛出异常？", "options": ["s[0]", "s.at(0)", "s.front()", "s.back()"], "answer": "1"}]
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
<p><strong>指针</strong>是存储内存地址的变量。理解指针是掌握 C++ 的关键。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int value = 42;
int* ptr = &value;    // & 取地址运算符，ptr 存储 value 的地址

std::cout << ptr;     // 输出地址（十六进制，如 0x7ffd1234）
std::cout << *ptr;    // * 解引用运算符，输出 42

*ptr = 100;           // 通过指针修改值
// value 现在等于 100

// 指针的指针
int** pptr = &ptr;    // pptr 存储 ptr 的地址
std::cout << **pptr;  // 两次解引用，输出 100</code></pre>
</div>

<h3>指针的大小与类型</h3>
<p>所有指针的大小相同（32位系统 4 字节，64位系统 8 字节），但指针的类型决定了编译器如何解释指向的内存。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int* ip;      // 指向 int，每次 +1 移动 4 字节
double* dp;   // 指向 double，每次 +1 移动 8 字节
char* cp;     // 指向 char，每次 +1 移动 1 字节

void* vp;     // 无类型指针，可指向任何类型
              // 但不能直接解引用，需要先转换类型

// 指针大小
sizeof(ip) == sizeof(dp) == sizeof(cp);  // 相同（64位都是8）</code></pre>
</div>

<h2>指针运算</h2>
<p>指针可以进行有限的算术运算：加、减、比较。运算的单位是"元素个数"而非字节数。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int arr[] = {10, 20, 30, 40, 50};
int* p = arr;

*p;           // 10
*(p + 1);     // 20（指针向后移动一个 int 的大小 = 4 字节）
*(p + 2);     // 30

p++;          // p 现在指向 arr[1]
p += 2;       // p 现在指向 arr[3]

// 指针减法：计算两个指针间的元素个数
int* end = arr + 5;
size_t count = end - p;  // 2（p指向arr[3]，end指向arr[5]）</code></pre>
</div>

<h2>引用</h2>
<p><strong>引用</strong>是变量的别名，必须初始化且不能重新绑定。引用让语法更简洁，避免指针的空值问题。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>int x = 10;
int& ref = x;   // ref 是 x 的别名，必须初始化

ref = 20;       // 等价于 x = 20
std::cout << x; // 输出 20

// 引用 vs 指针
// 1. 引用必须初始化，不能为空
// 2. 引用一旦绑定不能改变（不像指针可以指向别处）
// 3. 使用引用不需要解引用，语法更自然

int y = 50;
// ref = y;     // ❌ 这不是重新绑定！而是把 y 的值赋给 x！

// 指针可以重新指向
int* p = &x;
p = &y;        // ✅ p 现在指向 y</code></pre>
</div>

<h2>nullptr <span class="version-tag tag-cpp11">C++11</span></h2>
<p><code>nullptr</code> 是 C++11 引入的类型安全的空指针，替代了不安全的 <code>NULL</code> 宏。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// C++11 前的问题
int* p1 = NULL;    // NULL 本质是宏 0
int* p2 = 0;       // 0 可以赋值给指针

void foo(int x);
void foo(int* p);

foo(NULL);     // ❌ 歧义！可能调用 foo(int)，因为 NULL 是 0
foo(nullptr);  // ✅ 明确调用 foo(int*)，nullptr 的类型是 std::nullptr_t

// nullptr 是唯一的，可以比较
if (ptr == nullptr) { /* 空指针检查 */ }
if (!ptr) { /* 等价写法 */ }</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 指针使用建议</div>
  <p>1. 初始化所有指针（或用 RAII 智能指针）<br>2. 删除指针后置为 <code>nullptr</code><br>3. 用引用替代非空指针参数<br>4. 现代 C++ 优先用 <code>std::unique_ptr</code> 和 <code>std::shared_ptr</code></p>
</div>
`,
    exercises: [{"type": "choice", "question": "int* p = &x; *p 表示？", "options": ["p 的地址", "x 的地址", "x 的值", "p 的值"], "answer": "2"}, {"type": "truefalse", "question": "引用一旦绑定到一个变量后，可以重新绑定到另一个变量。", "answer": "false"}, {"type": "fillblank", "question": "C++11 引入的类型安全的空指针是 ______。", "answer": "nullptr"}, {"type": "output", "code": "int arr[] = {10, 20, 30};\nint* p = arr;\np++;\nstd::cout << *p;", "options": ["10", "20", "30", "编译错误"], "answer": "1"}, {"type": "choice", "question": "引用和指针的主要区别是？", "options": ["引用占用更多内存", "引用不能为空且不能重新绑定", "指针效率更高", "没有区别"], "answer": "1"}]
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
<p>当编译期无法确定数组大小，或对象生命周期需要跨作用域时，使用<strong>动态内存分配</strong>。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 分配单个对象
int* p = new int(42);       // 分配并初始化为 42
int* p2 = new int;          // 分配但未初始化（值不确定！）
int* p3 = new int();        // 分配并值初始化为 0

// 分配数组
int* arr = new int[100];     // 分配 100 个 int（未初始化）
int* arr2 = new int[100](); // 全部初始化为 0（C++11）

// 使用
*p = 100;
arr[0] = 1;

// 释放（必须匹配！）
delete p;        // 释放单个对象
delete p2;
delete p3;
delete[] arr;    // 释放数组（必须用 delete[]）
delete[] arr2;

// 不要混用！
// delete arr;     // ❌ 未定义行为！
// delete[] p;     // ❌ 未定义行为！</code></pre>
</div>

<div class="callout danger">
  <div class="callout-icon">🚨 内存泄漏</div>
  <p>忘记 <code>delete</code> 会导致<strong>内存泄漏</strong>（程序占用的内存越来越多但永不释放）。如果异常在 <code>new</code> 和 <code>delete</code> 之间抛出，delete 可能永远不会执行。现代 C++ 应使用智能指针避免手动管理内存。</p>
</div>

<h2>智能指针 <span class="version-tag tag-cpp11">C++11</span></h2>
<p>智能指针是<strong>RAII</strong>（资源获取即初始化）思想的体现：构造函数获取资源，析构函数释放资源。</p>

<table>
  <tr><th>智能指针</th><th>头文件</th><th>所有权</th><th>内存释放时机</th><th>用途</th></tr>
  <tr><td><code>unique_ptr</code></td><td><code>&lt;memory&gt;</code></td><td>独占</td><td>离开作用域或显式释放</td><td>单一所有者资源</td></tr>
  <tr><td><code>shared_ptr</code></td><td><code>&lt;memory&gt;</code></td><td>共享</td><td>最后一个所有者销毁时</td><td>多个所有者资源</td></tr>
  <tr><td><code>weak_ptr</code></td><td><code>&lt;memory&gt;</code></td><td>弱引用（无所有权）</td><td>不影响生命周期</td><td>打破循环引用</td></tr>
</table>

<h3>unique_ptr</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;memory&gt;

// 创建（推荐用 make_unique）
auto ptr = std::make_unique<int>(42);

// 访问
std::cout << *ptr;       // 42

// 转移所有权
auto ptr2 = std::move(ptr);  // ptr 现在为空 (nullptr)
// ptr == nullptr

// 自定义删除器（管理非内存资源）
auto file = std::unique_ptr&lt;FILE, decltype(&fclose)&gt;(
    fopen("data.txt", "r"), fclose
);
// 文件会在 file 离开作用域时自动关闭

// 自动释放，无需手动 delete
// 即使发生异常，析构函数也会被调用</code></pre>
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
    std::shared_ptr<Node> next;  // ❌ 可能导致循环引用
};

// 解决：使用 weak_ptr
struct Node {
    std::weak_ptr<Node> next;     // ✅ 不增加引用计数
};

// 使用 weak_ptr 前需要 lock() 检查对象是否还存在
auto sp = p1->next.lock();
if (sp) {
    // next 指向的对象仍然存在
}</code></pre>
</div>

<h2>RAII 原则</h2>
<div class="callout tip">
  <div class="callout-icon">💡 RAII: Resource Acquisition Is Initialization</div>
  <p>资源获取即初始化。将资源管理绑定到对象的生命周期：构造函数获取资源，析构函数释放资源。这是 C++ 资源管理的核心哲学。</p>
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
    // 禁止拷贝（独占资源）
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
    // 允许移动
    FileHandle(FileHandle&& other) noexcept : file(other.file) {
        other.file = nullptr;
    }
};

// 使用：无论正常返回还是异常，文件都会被关闭
void processFile() {
    FileHandle fh("data.txt", "r");
    if (some_error) throw std::exception();
    // fh 的析构函数会自动调用 fclose
}</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 现代 C++ 内存管理建议</div>
  <p><strong>绝对不用</strong>裸 <code>new/delete</code>（除非在智能指针的实现中）。始终用 <code>std::make_unique</code> 和 <code>std::make_shared</code> 创建智能指针。遵循"谁分配谁释放"的原则，但通过 RAII 自动化。</p>
</div>
`,
    exercises: [{"type": "choice", "question": "释放动态分配的数组应该用？", "options": ["delete", "delete[]", "free", "release"], "answer": "1"}, {"type": "truefalse", "question": "shared_ptr 的引用计数降为 0 时，会自动释放内存。", "answer": "true"}, {"type": "fillblank", "question": "unique_ptr 使用 ______ 函数转移所有权。", "answer": "std::move"}, {"type": "output", "code": "std::shared_ptr<int> p1 = std::make_shared<int>(10);\n{\n    auto p2 = p1;\n}\nstd::cout << p1.use_count();", "options": ["0", "1", "2", "编译错误"], "answer": "1"}, {"type": "choice", "question": "RAII 的全称是？", "options": ["Random Access Is Instant", "Resource Acquisition Is Initialization", "Release After Immediate Init", "Read And Input Immediately"], "answer": "1"}]
  },
  {
    id: "ch7",
    title: "第7章：面向对象编程（OOP）",
    icon: "🏗️",
    summary: "类、对象、构造函数、析构函数与访问控制",
    topics: ["类", "构造函数", "封装"],
    content: `
<h2>类与对象</h2>
<p><strong>类</strong>是用户自定义的数据类型，将数据（成员变量）和操作（成员函数）封装在一起。<strong>对象</strong>是类的实例。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Student {
public:                        // 公有成员：外部可访问
    std::string name;
    int age;

    void study() {             // 成员函数
        std::cout << name << " 正在学习" << std::endl;
    }

    void introduce() {
        std::cout << "我叫" << name << "，今年" << age << "岁" << std::endl;
    }
};

// 创建对象
Student stu;                   // 栈上对象（推荐）
stu.name = "张三";
stu.age = 20;
stu.study();                   // 调用成员函数

// 堆上对象
Student* pStu = new Student();
pStu->name = "李四";           // 指针用 -> 访问成员
pStu->study();
delete pStu;                   // 记得释放！

// C++11 列表初始化
Student stu2{"王五", 21};      // 直接初始化成员</code></pre>
</div>

<h2>访问控制</h2>
<p>访问控制符实现了<strong>封装</strong>——隐藏实现细节，暴露必要接口。</p>

<table>
  <tr><th>修饰符</th><th>含义</th><th>类内部</th><th>子类</th><th>外部</th></tr>
  <tr><td><code>public</code></td><td>公有</td><td>✓</td><td>✓</td><td>✓</td></tr>
  <tr><td><code>private</code></td><td>私有</td><td>✓</td><td>✗</td><td>✗</td></tr>
  <tr><td><code>protected</code></td><td>保护</td><td>✓</td><td>✓</td><td>✗</td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class BankAccount {
private:
    double balance;             // 私有：外部不能直接修改余额

public:
    // 构造函数
    BankAccount(double initial) : balance(initial) {}

    // 公共接口
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    double getBalance() const {  // const 成员函数：不修改成员
        return balance;
    }
};

BankAccount acc(1000);
acc.deposit(500);
acc.withdraw(200);
// acc.balance = 999999;  // ❌ 编译错误！balance 是 private</code></pre>
</div>

<h2>构造函数与析构函数</h2>
<p><strong>构造函数</strong>在对象创建时调用，<strong>析构函数</strong>在对象销毁时调用。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Rectangle {
    double width, height;
public:
    // 默认构造函数
    Rectangle() : width(0), height(0) {
        std::cout << "默认构造" << std::endl;
    }

    // 带参数构造函数
    Rectangle(double w, double h) : width(w), height(h) {
        std::cout << "参数构造: " << w << "x" << h << std::endl;
    }

    // 拷贝构造函数
    Rectangle(const Rectangle& other) 
        : width(other.width), height(other.height) {
        std::cout << "拷贝构造" << std::endl;
    }

    // 移动构造函数（C++11）
    Rectangle(Rectangle&& other) noexcept
        : width(other.width), height(other.height) {
        other.width = 0;
        other.height = 0;
        std::cout << "移动构造" << std::endl;
    }

    // 析构函数
    ~Rectangle() {
        std::cout << "析构: " << width << "x" << height << std::endl;
    }

    double area() const {        // const 成员函数承诺不修改对象
        return width * height;
    }
};

// 创建对象的各种方式
Rectangle r1;                    // 默认构造
Rectangle r2(3.0, 4.0);        // 参数构造
Rectangle r3 = r2;             // 拷贝构造
Rectangle r4 = std::move(r2);  // 移动构造（r2 变成空对象）
auto r5 = std::make_unique<Rectangle>(5.0, 6.0);  // 堆上构造</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 初始化列表</div>
  <p>构造函数的初始化列表 <code>: width(w), height(h)</code> 比在函数体内赋值效率更高。对于 <code>const</code> 成员和引用成员，初始化列表是<strong>唯一</strong>的初始化方式。</p>
</div>

<h2>this 指针</h2>
<p>每个非静态成员函数都有一个隐藏的 <code>this</code> 指针，指向调用该函数的对象。</p>

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
        this->count++;     // 明确指代成员变量（解决命名冲突）
        return *this;        // 返回当前对象引用，支持链式调用
    }

    Counter& add(int n) {
        this->count += n;
        return *this;
    }
};

// 链式调用
counter.increment().increment().add(5);  // 连续调用</code></pre>
</div>

<h2>静态成员</h2>
<p><strong>静态成员</strong>属于类而非某个对象，所有对象共享同一个静态成员。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Counter {
    static int instanceCount;  // 声明（属于类）
    int id;
public:
    Counter() : id(++instanceCount) {
        std::cout << "创建对象 #" << id << std::endl;
    }
    ~Counter() {
        instanceCount--;
        std::cout << "销毁对象 #" << id << std::endl;
    }
    static int getCount() {    // 静态成员函数
        return instanceCount;
    }
};

int Counter::instanceCount = 0;  // 定义并初始化（必须在类外）

// 访问静态成员
std::cout << Counter::getCount();  // 通过类名访问
Counter c1;
Counter c2;
std::cout << Counter::getCount();  // 2</code></pre>
</div>
`,
    exercises: [{"type": "choice", "question": "类的私有成员可以被谁访问？", "options": ["任何人", "只有类内部", "类和子类", "类的外部"], "answer": "1"}, {"type": "truefalse", "question": "构造函数可以有返回值。", "answer": "false"}, {"type": "fillblank", "question": "C++ 中指向当前对象的隐式指针是 ______。", "answer": "this"}, {"type": "output", "code": "class A {\npublic:\n    A() { cout << \"1\"; }\n    ~A() { cout << \"2\"; }\n};\nint main() { A a; return 0; }", "options": ["12", "21", "1", "2"], "answer": "0"}, {"type": "choice", "question": "静态成员属于？", "options": ["某个对象", "整个类", "全局命名空间", "不占用内存"], "answer": "1"}]
  },
  {
    id: "ch8",
    title: "第8章：OOP进阶",
    icon: "🔮",
    summary: "继承、多态、虚函数、运算符重载与友元",
    topics: ["继承", "多态", "虚函数", "运算符重载"],
    content: `
<h2>继承</h2>
<p><strong>继承</strong>允许创建基于现有类的新类，新类自动获得基类的成员。继承实现了代码复用和层次化设计。</p>

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
    void sleep() { std::cout << name << " 在睡觉" << std::endl; }
};

class Dog : public Animal {       // public 继承
public:
    Dog(const std::string& n) : Animal(n) {}  // 调用基类构造函数
    void bark() { std::cout << name << " 汪汪!" << std::endl; }
};

Dog dog("旺财");
dog.eat();     // 继承自 Animal
dog.sleep();   // 继承自 Animal
dog.bark();    // Dog 自己的方法</code></pre>
</div>

<table>
  <tr><th>继承方式</th><th>public 成员</th><th>protected 成员</th><th>private 成员</th></tr>
  <tr><td><code>public</code></td><td>public</td><td>protected</td><td>不可访问</td></tr>
  <tr><td><code>protected</code></td><td>protected</td><td>protected</td><td>不可访问</td></tr>
  <tr><td><code>private</code></td><td>private</td><td>private</td><td>不可访问</td></tr>
</table>

<div class="callout tip">
  <div class="callout-icon">💡 继承设计建议</div>
  <p>绝大多数情况用 <code>public</code> 继承（"is-a"关系）。<code>private</code> 继承表示"is-implemented-in-terms-of"，很少用。<code>protected</code> 继承几乎不用。</p>
</div>

<h2>多态与虚函数</h2>
<p><strong>多态</strong>允许通过基类指针/引用调用派生类的实现，是面向对象的核心特性。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Shape {
public:
    virtual double area() const = 0;  // 纯虚函数：没有实现
    virtual void draw() const {        // 虚函数：有默认实现
        std::cout << "绘制形状" << std::endl;
    }
    virtual ~Shape() = default;        // 虚析构函数（重要！）
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override {    // override 显式标记重写
        return 3.14159 * radius * radius;
    }
    void draw() const override {
        std::cout << "绘制圆形" << std::endl;
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
shape->draw();    // 调用 Circle::draw()
std::cout << shape->area();  // 调用 Circle::area()

shape = std::make_unique<Rectangle>(3.0, 4.0);
shape->draw();    // 调用 Shape::draw()（Rectangle 没重写）
std::cout << shape->area();  // 调用 Rectangle::area()</code></pre>
</div>

<div class="callout danger">
  <div class="callout-icon">🚨 虚析构函数</div>
  <p>如果类有虚函数，析构函数<strong>必须</strong>声明为 <code>virtual</code>。否则通过基类指针 <code>delete</code> 派生类对象时，只会调用基类析构函数，导致派生类资源泄漏！</p>
</div>

<h3>override 与 final <span class="version-tag tag-cpp11">C++11</span></h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Base {
public:
    virtual void foo() {}
    virtual void bar() final {}  // 禁止子类重写
};

class Derived : public Base {
public:
    void foo() override {}        // 显式声明重写，签名不匹配会报错
    // void bar() override {}     // ❌ 编译错误！bar 被标记为 final
};</code></pre>
</div>

<h2>运算符重载</h2>
<p>运算符重载允许自定义类型使用标准运算符，使代码更直观。</p>

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
        return *this;  // 支持链式：a += b += c
    }

    // 比较
    bool operator==(const Complex& other) const {
        return real == other.real && imag == other.imag;
    }
    bool operator!=(const Complex& other) const {
        return !(*this == other);  // 委托给 ==
    }

    // 下标运算符
    double operator[](int index) const {
        return (index == 0) ? real : imag;
    }

    // 输出运算符（友元：需要访问私有成员）
    friend std::ostream& operator<<(std::ostream& os, const Complex& c) {
        os << c.real << " + " << c.imag << "i";
        return os;
    }

    // 输入运算符
    friend std::istream& operator>>(std::istream& is, Complex& c) {
        is >> c.real >> c.imag;
        return is;
    }
};

Complex a(1, 2), b(3, 4);
Complex c = a + b;       // 调用 operator+
std::cout << c << std::endl;  // 调用友元 operator<<
if (a == b) { /* ... */ }</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 可重载的运算符</div>
  <p>大部分 C++ 运算符都可以重载，但 <code>::</code>（作用域）、<code>.</code>（成员访问）、<code>.*</code>（成员指针）、<code>?:</code>（三元）、<code>sizeof</code>、<code>typeid</code> 不能重载。</p>
</div>

<h2>友元函数与友元类</h2>
<p><strong>友元</strong>允许外部函数或类访问私有成员。友元破坏了封装，应谨慎使用。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>class Box {
private:
    double width;
public:
    Box(double w) : width(w) {}
    friend void printWidth(const Box& b);     // 友元函数
    friend class BoxManager;                   // 友元类
};

void printWidth(const Box& b) {
    std::cout << b.width << std::endl;  // 可以访问私有成员
}

class BoxManager {
public:
    void resize(Box& b, double w) {
        b.width = w;  // 可以访问 Box 的私有成员
    }
};</code></pre>
</div>
`,
    exercises: [{"type": "choice", "question": "含有纯虚函数的类被称为什么？", "options": ["基类", "抽象类", "派生类", "模板类"], "answer": "1"}, {"type": "truefalse", "question": "override 关键字用于显式标记函数重写，签名不匹配会编译报错。", "answer": "true"}, {"type": "fillblank", "question": "如果类有虚函数，析构函数应该声明为 ______。", "answer": "virtual"}, {"type": "output", "code": "class Base {\npublic:\n    virtual void foo() { cout << \"Base\"; }\n};\nclass Derived : public Base {\npublic:\n    void foo() override { cout << \"Derived\"; }\n};\nint main() {\n    Base* b = new Derived();\n    b->foo();\n    delete b;\n}", "options": ["Base", "Derived", "BaseDerived", "编译错误"], "answer": "1"}, {"type": "choice", "question": "运算符重载时，二元运算符通常有几个参数？", "options": ["0", "1", "2", "3"], "answer": "1"}]
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
<p><strong>模板</strong>允许编写与类型无关的代码，编译器根据调用时的实参类型自动生成特定版本的函数。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 函数模板
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// 使用：编译器自动推导类型
int i = max(3, 5);           // T 推导为 int
double d = max(2.5, 3.7);    // T 推导为 double
std::string s = max(std::string("abc"), std::string("def"));  // T 为 string

// 显式指定类型
auto result = max<double>(3, 5.5);  // T = double，3 被提升为 3.0

// 多类型参数
template<typename T, typename U>
auto multiply(T a, U b) -> decltype(a * b) {  // C++11 尾置返回类型
    return a * b;
}

// C++14 简化
auto multiply2(T a, U b) {  // 返回类型自动推导
    return a * b;
}</code></pre>
</div>

<h2>类模板</h2>
<p>类模板可以创建泛型数据结构。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>template<typename T, int Size>
class Array {
    T data[Size];
public:
    T& operator[](int index) {
        if (index < 0 || index >= Size) throw std::out_of_range("越界");
        return data[index];
    }
    const T& operator[](int index) const {
        if (index < 0 || index >= Size) throw std::out_of_range("越界");
        return data[index];
    }
    int size() const { return Size; }
    bool empty() const { return Size == 0; }
};

// 使用
Array<int, 100> intArray;
Array<double, 50> doubleArray;

intArray[0] = 42;
std::cout << intArray.size();  // 100

// Array<int, 100> 和 Array<int, 200> 是完全不同的类型！</code></pre>
</div>

<h2>模板特化</h2>
<p>当通用模板不适合某些类型时，可以针对特定类型提供专门的实现。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 通用模板
template<typename T>
class Printer {
public:
    void print(const T& value) {
        std::cout << value << std::endl;
    }
};

// 全特化：针对 bool 类型的特化版本
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
        if (ptr) std::cout << "指针地址: " << ptr << std::endl;
        else std::cout << "空指针" << std::endl;
    }
};

Printer<int> p1;         // 使用通用模板
Printer<bool> p2;      // 使用 bool 特化
Printer<int*> p3;      // 使用指针偏特化</code></pre>
</div>

<h2>可变参数模板 <span class="version-tag tag-cpp11">C++11</span></h2>
<p>可变参数模板允许函数或类接受任意数量和类型的参数。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 递归展开参数包
void print() {  // 终止递归
    std::cout << std::endl;
}

template<typename T, typename... Args>
void print(T value, Args... args) {
    std::cout << value << " ";
    print(args...);  // 递归调用，每次减少一个参数
}

// 使用
print(1, 2.5, "hello", 'a');  // 输出: 1 2.5 hello a

// C++17 折叠表达式（更简洁）
template<typename... Args>
void print_all(Args... args) {
    (std::cout << ... << args) << std::endl;
}

// C++17 if constexpr（编译期分支）
template<typename T>
auto get_value(T t) {
    if constexpr (std::is_pointer_v<T>)       // 编译期判断
        return *t;                              // 解引用
    else
        return t;                               // 直接返回
}</code></pre>
</div>

<h2>类型推导关键字</h2>
<table>
  <tr><th>关键字</th><th>作用</th><th>示例</th></tr>
  <tr><td><code>auto</code></td><td>自动推断变量类型</td><td><code>auto x = 42;  // int</code></td></tr>
  <tr><td><code>decltype</code></td><td>获取表达式类型</td><td><code>decltype(x) y = 0;</code></td></tr>
  <tr><td><code>decltype(auto)</code></td><td>完美转发返回类型</td><td><code>C++14</code></td></tr>
  <tr><td><code>std::declval</code></td><td>不构造对象获取类型</td><td><code>decltype(std::declval<T>().foo())</code></td></tr>
</table>
`,
    exercises: [{"type": "choice", "question": "模板参数推导发生在哪个阶段？", "options": ["运行时", "链接时", "编译期", "预处理期"], "answer": "2"}, {"type": "truefalse", "question": "template<typename T, int N> 中 N 必须是编译期常量。", "answer": "true"}, {"type": "fillblank", "question": "C++11 中用于获取表达式类型的关键字是 ______。", "answer": "decltype"}, {"type": "output", "code": "auto x = 3 + 2.5;\nstd::cout << typeid(x).name();", "options": ["int", "double", "float", "编译错误"], "answer": "1"}, {"type": "choice", "question": "C++17 折叠表达式 (std::cout << ... << args) 中的 ... 叫做？", "options": ["参数包", "折叠运算符", "展开符", "模板参数"], "answer": "0"}]
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
  <li><strong>容器</strong>（Containers）：存储数据的类模板</li>
  <li><strong>迭代器</strong>（Iterators）：访问容器元素的通用接口</li>
  <li><strong>算法</strong>（Algorithms）：操作数据的通用函数</li>
</ul>

<div class="callout note">
  <div class="callout-icon">📘 STL 设计哲学</div>
  <p>数据（容器）和算法分离，通过迭代器连接。同一种算法可以作用于任何支持相应迭代器的容器。</p>
</div>

<h2>常用容器</h2>

<h3>vector - 动态数组</h3>
<p>最常用的序列容器，支持随机访问，尾部插入删除高效。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;vector&gt;

std::vector<int> vec = {1, 2, 3, 4, 5};

// 添加元素
vec.push_back(6);              // 尾部添加
vec.emplace_back(7);           // 原地构造（C++11，更高效）
vec.insert(vec.begin(), 0);    // 头部插入（O(n)，慢）

// 访问
vec[0];           // 不检查边界（快但不安全）
vec.at(0);        // 检查边界，越界抛出 out_of_range
vec.front();      // 首元素
vec.back();       // 尾元素
vec.data();       // 返回指向底层数组的指针

// 容量相关
vec.size();        // 元素个数
vec.empty();      // 是否为空
vec.capacity();   // 当前容量（不重新分配能容纳的元素数）
vec.reserve(100); // 预分配空间（避免多次重新分配）
vec.shrink_to_fit(); // 释放多余容量（C++11）

// 删除
vec.pop_back();    // 删除尾部
vec.erase(vec.begin());  // 删除指定位置
vec.clear();       // 清空

// 遍历
for (size_t i = 0; i < vec.size(); i++) {
    std::cout << vec[i] << " ";
}

// 范围 for（推荐）
for (const auto& x : vec) {
    std::cout << x << " ";
}</code></pre>
</div>

<h3>map - 有序键值对</h3>
<p>基于红黑树实现的有序关联容器，按键排序，查找插入删除都是 O(log n)。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;map&gt;

std::map<std::string, int> scores;

// 插入
scores["Alice"] = 95;
scores.insert({"Bob", 87});      // C++11 列表初始化
scores.emplace("Charlie", 92);   // 原地构造

// 访问
std::cout << scores["Alice"];   // 95

// 检查键是否存在（不要用 []，会插入默认值）
if (scores.find("Dave") != scores.end()) {
    std::cout << "Dave 存在" << std::endl;
}

// 遍历（按键的升序排列）
for (const auto& [name, score] : scores) {  // C++17 结构化绑定
    std::cout << name << ": " << score << std::endl;
}

// lower_bound / upper_bound
auto it = scores.lower_bound("C");  // 第一个键 >= "C" 的元素
auto it2 = scores.upper_bound("C"); // 第一个键 > "C" 的元素</code></pre>
</div>

<h3>unordered_map - 哈希表</h3>
<p>基于哈希表实现的无序关联容器，平均查找插入删除 O(1)。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;unordered_map&gt;

// 与 map 接口几乎相同，但底层是哈希表
std::unordered_map<std::string, int> hashmap;
hashmap["key"] = 100;
hashmap.reserve(1000);  // 预分配桶数量，减少 rehash

// 优点：平均 O(1) 查找插入
// 缺点：
//  1. 元素无序（不支持下界/上界查找）
//  2. 最坏情况 O(n)（哈希冲突严重时）
//  3. 需要好的哈希函数

// 自定义类型的哈希
struct Point {
    int x, y;
    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }
};

namespace std {
    template<>
    struct hash<Point> {
        size_t operator()(const Point& p) const {
            return hash<int>()(p.x) ^ (hash<int>()(p.y) << 1);
        }
    };
}

std::unordered_map<Point, std::string> pointNames;</code></pre>
</div>

<h2>迭代器</h2>
<p>迭代器是 STL 的核心抽象，它将算法和容器解耦。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>std::vector<int> vec = {1, 2, 3, 4, 5};

// 迭代器类型
std::vector<int>::iterator it;            // 可读可写
std::vector<int>::const_iterator cit;     // 只读
std::vector<int>::reverse_iterator rit;  // 反向迭代器

// 使用迭代器遍历
for (auto it = vec.begin(); it != vec.end(); ++it) {
    *it *= 2;  // 修改元素
}

// const 迭代器
for (auto it = vec.cbegin(); it != vec.cend(); ++it) {
    // *it *= 2;  // ❌ 编译错误！const_iterator 不能修改
}

// C++11 辅助函数
auto it2 = std::begin(vec);    // 等价于 vec.begin()
auto end = std::end(vec);      // 等价于 vec.end()

// 迭代器分类
// Input Iterator        - 只读，单次遍历（istream_iterator）
// Output Iterator       - 只写，单次遍历（ostream_iterator）
// Forward Iterator      - 可读写，多次遍历（forward_list）
// Bidirectional Iterator - 可双向移动（list, set, map）
// Random Access Iterator - 可随机访问（vector, deque, array）
// Contiguous Iterator   - 内存连续（C++17, vector, array, string）</code></pre>
</div>

<h2>算法</h2>
<p>STL 算法在 <code>&lt;algorithm&gt;</code> 头文件中，作用于迭代器范围 <code>[first, last)</code>。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;algorithm&gt;

std::vector<int> vec = {3, 1, 4, 1, 5, 9, 2, 6};

// 排序
std::sort(vec.begin(), vec.end());                         // 升序
std::sort(vec.begin(), vec.end(), std::greater<int>());   // 降序
std::sort(vec.begin(), vec.end(), [](int a, int b) {       // 自定义比较
    return a > b;
});

// 查找
auto it = std::find(vec.begin(), vec.end(), 5);            // 线性查找
bool found = std::binary_search(vec.begin(), vec.end(), 5); // 二分查找（需有序）

// 最值
auto [minIt, maxIt] = std::minmax_element(vec.begin(), vec.end());

// 变换（修改容器）
std::transform(vec.begin(), vec.end(), vec.begin(),
               [](int x) { return x * x; });

// 条件计数
int count = std::count_if(vec.begin(), vec.end(),
                          [](int x) { return x > 5; });

// 去重（需要先排序）
std::sort(vec.begin(), vec.end());
auto last = std::unique(vec.begin(), vec.end());
vec.erase(last, vec.end());  // unique 只移动元素，需要 erase

// 遍历
std::for_each(vec.begin(), vec.end(), [](int& x) { x++; });

// 拷贝
std::vector<int> dest(vec.size());
std::copy(vec.begin(), vec.end(), dest.begin());</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 算法复杂度速查</div>
  <p>sort: O(n log n) | find: O(n) | binary_search: O(log n) | 
  lower_bound: O(log n) | unique（排序后）: O(n) | 
  count_if: O(n)</p>
</div>
`,
    exercises: [{"type": "choice", "question": "vector 的 push_back 操作的时间复杂度（均摊）是？", "options": ["O(1)", "O(log n)", "O(n)", "O(n²)"], "answer": "0"}, {"type": "truefalse", "question": "map 的查找时间复杂度是 O(1)。", "answer": "false"}, {"type": "fillblank", "question": "unordered_map 的平均查找时间复杂度是 ______。", "answer": "O(1)"}, {"type": "output", "code": "std::vector<int> v = {3, 1, 2};\nstd::sort(v.begin(), v.end());\nstd::cout << v[1];", "options": ["1", "2", "3", "编译错误"], "answer": "1"}, {"type": "choice", "question": "以下哪个容器支持随机访问迭代器？", "options": ["list", "map", "vector", "set"], "answer": "2"}]
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
<p>当程序遇到无法正常处理的情况时，可以<strong>抛出异常</strong>，由调用栈上层的代码<strong>捕获</strong>并处理。</p>

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
    std::cout << "运行时错误: " << e.what() << std::endl;
} catch (const std::logic_error& e) {
    std::cout << "逻辑错误: " << e.what() << std::endl;
} catch (const std::exception& e) {
    // 捕获所有标准异常（基类捕获）
    std::cout << "标准异常: " << e.what() << std::endl;
} catch (...) {
    // 捕获所有异常（未知类型）
    std::cout << "未知异常" << std::endl;
}

// 重新抛出
try {
    // ...
} catch (const std::exception& e) {
    // 做一些处理...
    throw;  // 重新抛出当前捕获的异常
}</code></pre>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ 捕获顺序</div>
  <p>捕获块应按<strong>从子类到基类</strong>的顺序排列。如果基类在前，子类的 catch 块永远不会被执行。</p>
</div>

<h2>标准异常类层次</h2>
<table>
  <tr><th>异常类</th><th>头文件</th><th>用途</th></tr>
  <tr><td><code>std::exception</code></td><td><code>&lt;exception&gt;</code></td><td>所有标准异常的基类</td></tr>
  <tr><td><code>std::runtime_error</code></td><td><code>&lt;stdexcept&gt;</code></td><td>运行时错误（如文件不存在）</td></tr>
  <tr><td><code>std::logic_error</code></td><td><code>&lt;stdexcept&gt;</code></td><td>逻辑错误（如前置条件违反）</td></tr>
  <tr><td><code>std::invalid_argument</code></td><td><code>&lt;stdexcept&gt;</code></td><td>无效参数</td></tr>
  <tr><td><code>std::out_of_range</code></td><td><code>&lt;stdexcept&gt;</code></td><td>越界访问（如 vector::at）</td></tr>
  <tr><td><code>std::bad_alloc</code></td><td><code>&lt;new&gt;</code></td><td>内存分配失败</td></tr>
  <tr><td><code>std::bad_cast</code></td><td><code>&lt;typeinfo&gt;</code></td><td>dynamic_cast 失败</td></tr>
</table>

<h2>自定义异常</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 继承标准异常
class FileException : public std::runtime_error {
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
throw FileException("无法打开文件: data.txt");
throw NetworkException("连接超时", 408);

// 捕获自定义异常
try {
    // ...
} catch (const NetworkException& e) {
    std::cout << "网络错误 [" << e.getCode() << "]: " << e.what() << std::endl;
}</code></pre>
</div>

<h2>noexcept <span class="version-tag tag-cpp11">C++11</span></h2>
<p><code>noexcept</code> 标记函数不抛出异常，编译器可以据此优化代码。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 标记不抛异常
void safeFunction() noexcept {
    // 如果这里抛出异常，程序会调用 std::terminate()
}

// 条件 noexcept
void func() noexcept(true);    // 承诺不抛
void func2() noexcept(false);  // 可能抛

// 常用于移动操作（影响 STL 容器优化）
class MyClass {
public:
    MyClass(MyClass&& other) noexcept;             // 移动构造
    MyClass& operator=(MyClass&& other) noexcept; // 移动赋值
};

// noexcept 运算符：检查表达式是否不抛异常
static_assert(noexcept(std::declval<MyClass>().foo()), "foo 必须不抛异常");</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 异常安全保证</div>
  <p><strong>基本保证</strong>：异常发生后，对象处于有效但不确定的状态。<br>
  <strong>强保证</strong>：异常发生后，对象状态回滚到操作前（事务性）。<br>
  <strong>不抛保证</strong>：操作绝不抛出异常（<code>noexcept</code>）。</p>
</div>
`,
    exercises: [{"type": "choice", "question": "catch 块的排列顺序应该是？", "options": ["基类在前", "子类在前", "任意顺序", "按字母顺序"], "answer": "1"}, {"type": "truefalse", "question": "noexcept 标记的函数如果抛出异常，程序会调用 std::terminate()。", "answer": "true"}, {"type": "fillblank", "question": "捕获所有异常的语法是 catch ______。", "answer": "(...)"}, {"type": "output", "code": "try {\n    throw std::runtime_error(\"error\");\n} catch (const std::exception& e) {\n    cout << \"caught\";\n}", "options": ["编译错误", "caught", "异常未处理", "程序崩溃"], "answer": "1"}, {"type": "choice", "question": "以下哪个不是标准异常类？", "options": ["std::runtime_error", "std::out_of_range", "std::error", "std::bad_alloc"], "answer": "2"}]
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
<p>C++11 引入的统一初始化（花括号初始化）解决了 C++98 中一些棘手的初始化问题。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 统一初始化（花括号初始化）
int x{42};              // 避免窄化转换
double d = 3.14;
int y{d};               // ❌ 编译错误！double 转 int 是窄化转换

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
};

// 防止隐式类型转换
void foo(int x);
foo({3.14});  // ❌ 编译错误！窄化转换</code></pre>
</div>

<h2>移动语义 <span class="version-tag tag-cpp11">C++11</span></h2>
<p>移动语义允许将资源从一个对象"转移"到另一个对象，避免不必要的拷贝。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 左值 vs 右值
int x = 42;
int& lref = x;          // 左值引用（绑定到可寻址的对象）
int&& rref = 100;       // 右值引用（绑定到临时对象）

// std::move：将左值转为右值引用（承诺不再使用原对象）
std::string s1 = "hello";
std::string s2 = std::move(s1);  // s1 的资源被转移给 s2
// s1 现在处于"有效但未指定状态"（通常为空）

// 移动构造函数
class Buffer {
    char* data;
    size_t size;
public:
    // 拷贝构造（深拷贝）
    Buffer(const Buffer& other) 
        : size(other.size), data(new char[size]) {
        std::copy(other.data, other.data + size, data);
    }

    // 移动构造（资源转移）
    Buffer(Buffer&& other) noexcept
        : data(other.data), size(other.size) {
        other.data = nullptr;  // 置空源对象
        other.size = 0;
    }
};</code></pre>
</div>

<h2>完美转发 <span class="version-tag tag-cpp11">C++11</span></h2>
<p>完美转发在保持参数的值类别（左值/右值）的同时将参数传递给其他函数。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 万能引用（universal reference）+ std::forward
template<typename T>
void wrapper(T&& arg) {  // T&& 是万能引用（不是右值引用！）
    foo(std::forward<T>(arg));  // 保持值类别转发
}

// 使用
int x = 42;
wrapper(x);         // T = int&, 转发为左值
wrapper(42);        // T = int, 转发为右值
wrapper(std::move(x));  // 转发为右值

// 实际应用：工厂函数
template<typename T, typename... Args>
std::unique_ptr<T> make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}</code></pre>
</div>

<h2>结构化绑定 <span class="version-tag tag-cpp17">C++17</span></h2>
<p>结构化绑定可以将复合类型的成员解包到多个变量中。</p>

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
auto [a, b, c] = arr;

// 用于 tuple
auto t = std::make_tuple(1, 2.5, "hello");
auto [x, y, z] = t;</code></pre>
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
// it 在这里仍然可见（污染作用域）

// C++17
if (auto it = m.find("key"); it != m.end()) {
    std::cout << it->second;
}  // it 只在 if 语句内可见

// switch 同理
switch (int x = getValue(); x) {
    case 1: /* ... */ break;
    case 2: /* ... */ break;
    default: /* ... */ break;
}</code></pre>
</div>

<h2>概念（Concepts）<span class="version-tag tag-cpp20">C++20</span></h2>
<p>概念约束模板参数，让模板错误信息更友好。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 定义概念
template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::same_as<T>;
};

// 使用概念约束模板
template<Addable T>
T add(T a, T b) {
    return a + b;
}

// 或者
template<typename T>
    requires Addable<T>
T add(T a, T b);

// 简写语法（C++20 abbreviated function template）
auto add2(Addable auto a, Addable auto b) {
    return a + b;
}

// 标准库概念
std::sortable  // 可排序
std::copyable  // 可拷贝
std::movable   // 可移动</code></pre>
</div>

<h2>模块（Modules）<span class="version-tag tag-cpp20">C++20</span></h2>
<p>模块替代了传统的头文件/宏包含模型，编译更快、无宏污染。</p>

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
  <p>模块解决了头文件的三个问题：<br>1. 宏污染（#define 泄露）<br>2. 重复编译（头文件被编译多次）<br>3. 编译依赖（修改头文件导致大量重编译）</p>
</div>
`,
    exercises: [{"type": "choice", "question": "std::move 的作用是什么？", "options": ["复制对象", "将左值转为右值引用", "释放内存", "创建新对象"], "answer": "1"}, {"type": "truefalse", "question": "结构化绑定是 C++14 引入的特性。", "answer": "false"}, {"type": "fillblank", "question": "C++20 用于约束模板参数的新机制叫做 ______。", "answer": "Concepts"}, {"type": "output", "code": "int x = 10;\nint&& r = std::move(x);\nr = 20;\nstd::cout << x;", "options": ["10", "20", "编译错误", "未定义"], "answer": "1"}, {"type": "choice", "question": "C++17 的 if (auto it = find(...); it != end) 中 it 的作用域是？", "options": ["整个函数", "if 语句内部", "全局", "块外部"], "answer": "1"}]
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
<p>C++ 通过 <code>&lt;fstream&gt;</code> 头文件提供文件操作类。</p>

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
    while (std::getline(inFile, line)) {  // 逐行读取
        std::cout << line << std::endl;
    }
    inFile.close();
}

// 追加模式
std::ofstream appendFile("data.txt", std::ios::app);
appendFile << "追加的内容" << std::endl;

// 二进制模式
std::ofstream binFile("data.bin", std::ios::binary);
int data[] = {1, 2, 3, 4, 5};
binFile.write(reinterpret_cast<char*>(data), sizeof(data));
binFile.close();</code></pre>
</div>

<table>
  <tr><th>模式</th><th>说明</th></tr>
  <tr><td><code>std::ios::in</code></td><td>读取</td></tr>
  <tr><td><code>std::ios::out</code></td><td>写入（截断已有内容）</td></tr>
  <tr><td><code>std::ios::app</code></td><td>追加</td></tr>
  <tr><td><code>std::ios::ate</code></td><td>打开后定位到文件尾</td></tr>
  <tr><td><code>std::ios::binary</code></td><td>二进制模式（不转换换行符）</td></tr>
  <tr><td><code>std::ios::trunc</code></td><td>截断文件</td></tr>
</table>

<h2>字符串流</h2>
<p>字符串流在内存中操作字符串，常用于类型转换和字符串拼接。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;sstream&gt;

// 字符串拼接
std::ostringstream oss;
oss << "Name: " << "张三" << ", Age: " << 25 << ", Score: " << 95.5;
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
int n = std::stoi(s);           // string to int
double d = std::stod("3.14");
long l = std::stol("123456789");
std::string str = std::to_string(42);  // int to string

// 格式化字符串（C++20）
#include &lt;format&gt;
std::string fmt = std::format("Hello, {}! You are {} years old.", "Alice", 25);</code></pre>
</div>

<h2>格式化输出 <span class="version-tag tag-cpp20">C++20</span></h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;format&gt;

// 基本格式化
std::string s = std::format("Hello, {}!", "World");  // "Hello, World!"

// 位置参数
std::string s2 = std::format("{0} + {1} = {2}", 1, 2, 3);  // "1 + 2 = 3"

// 格式化选项
std::string s3 = std::format("{:0>5}", 42);     // "00042" (右对齐补零)
std::string s4 = std::format("{:<5}", 42);      // "42   " (左对齐)
std::string s5 = std::format("{:>5}", 42);       // "   42" (右对齐)
std::string s6 = std::format("{:.2f}", 3.14159); // "3.14" (2位小数)
std::string s7 = std::format("{:x}", 255);       // "ff" (十六进制)
std::string s8 = std::format("{:b}", 5);         // "101" (二进制, C++20)

// 直接输出
std::cout << std::format("pi = {:.5f}", 3.1415926535);

// 自定义类型的格式化（需特化 std::formatter）</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 C++20 前的格式化</div>
  <p>C++20 之前，格式化输出用 <code>printf</code>（类型不安全）或 <code>&lt;iomanip&gt;</code> 操控符。<code>std::format</code> 是类型安全且支持编译期检查的。</p>
</div>
`,
    exercises: [{"type": "choice", "question": "打开文件进行追加写入应该用什么模式？", "options": ["std::ios::out", "std::ios::app", "std::ios::in", "std::ios::trunc"], "answer": "1"}, {"type": "truefalse", "question": "std::stoi 函数将字符串转换为整数。", "answer": "true"}, {"type": "fillblank", "question": "C++20 中用于格式化字符串的头文件是 ______。", "answer": "format"}, {"type": "output", "code": "std::ostringstream oss;\noss << 10 << \" \" << 3.14;\nstd::cout << oss.str();", "options": ["103.14", "10 3.14", "13.14", "编译错误"], "answer": "1"}, {"type": "choice", "question": "std::format(\"{:x}\", 255) 的输出是？", "options": ["255", "FF", "ff", "0xFF"], "answer": "2"}]
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
<p>C++11 引入了标准线程库，使多线程编程跨平台且标准化。</p>

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
t1.join();  // 等待线程结束（不 join 会崩溃！）

// 互斥锁（保护共享数据）
std::mutex mtx;
int counter = 0;

void increment() {
    std::lock_guard<std::mutex> lock(mtx);  // RAII 自动加锁/解锁
    counter++;  // 临界区
}  // 离开作用域自动解锁

// 递归锁（同一线程可多次加锁）
std::recursive_mutex rmtx;

// 异步任务（获取返回值）
std::future<int> result = std::async(std::launch::async, []() {
    return 42 * 42;
});
std::cout << result.get();  // 1764（会阻塞等待任务完成）

// 条件变量（线程间通信）
std::condition_variable cv;
std::mutex cv_mtx;
bool ready = false;

// 等待线程
std::unique_lock<std::mutex> lk(cv_mtx);
cv.wait(lk, []{ return ready; });  // 阻塞直到 ready 为 true

// 通知线程
ready = true;
cv.notify_one();  // 唤醒一个等待线程
// cv.notify_all(); // 唤醒所有等待线程</code></pre>
</div>

<h2>原子操作</h2>
<p>原子操作是无锁线程同步的基础，比互斥锁更高效。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp11">C++11</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;atomic&gt;

std::atomic<int> atomic_counter{0};

// 无需互斥锁，线程安全
atomic_counter++;                    // 原子自增
atomic_counter.fetch_add(5);         // 原子加5，返回旧值
int old = atomic_counter.exchange(10); // 原子赋值，返回旧值

// CAS (Compare-And-Swap) - 无锁算法基础
int expected = 0;
bool success = atomic_counter.compare_exchange_strong(
    expected, 1  // 如果值是0，则设为1
);

// 原子指针
std::atomic<int*> atomic_ptr;
int* p = atomic_ptr.load();   // 原子读
atomic_ptr.store(new int(42)); // 原子写

// 内存序（memory_order）
// memory_order_relaxed - 最弱，只保证原子性
// memory_order_acquire - 读操作不会重排到后面
// memory_order_release - 写操作不会重排到前面
// memory_order_seq_cst - 最强，全局顺序一致（默认）</code></pre>
</div>

<h2>类型转换</h2>
<p>C++ 提供了四种显式类型转换，比 C 风格的转换更安全、语义更明确。</p>

<table>
  <tr><th>转换</th><th>语法</th><th>用途</th><th>检查</th></tr>
  <tr><td><code>static_cast</code></td><td><code>static_cast&lt;T&gt;(expr)</code></td><td>相关类型间转换</td><td>编译期</td></tr>
  <tr><td><code>dynamic_cast</code></td><td><code>dynamic_cast&lt;T&gt;(expr)</code></td><td>多态类型安全向下转换</td><td>运行期</td></tr>
  <tr><td><code>const_cast</code></td><td><code>const_cast&lt;T&gt;(expr)</code></td><td>添加/移除 const/volatile</td><td>编译期</td></tr>
  <tr><td><code>reinterpret_cast</code></td><td><code>reinterpret_cast&lt;T&gt;(expr)</code></td><td>底层位模式重解释</td><td>无</td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// static_cast
double d = 3.14;
int i = static_cast<int>(d);  // 截断小数部分：i = 3

// 基类和派生类指针转换
Base* b = new Derived();
Derived* d2 = static_cast<Derived*>(b);  // 不安全，假设 b 确实指向 Derived

// dynamic_cast（需要虚函数表）
Derived* d3 = dynamic_cast<Derived*>(b);  // 安全，运行期检查
if (d3) {
    // 转换成功
} else {
    // 转换失败（b 不指向 Derived）
}

// const_cast
const int x = 10;
int* p = const_cast<int*>(&x);  // 移除 const
// *p = 20;  // ⚠️ 未定义行为！不要修改 const 对象

// reinterpret_cast（最危险）
int num = 65;
char* cp = reinterpret_cast<char*>(&num);  // 将 int* 当作 char* 解释
// 用于底层编程：网络协议解析、序列化等</code></pre>
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

// 或者使用 #pragma once（非标准但广泛支持）
#pragma once

// 宏定义
#define PI 3.14159
#define SQUARE(x) ((x) * (x))  // 注意括号！

// 预定义宏
__FILE__      // 当前文件名
__LINE__      // 当前行号
__func__      // 当前函数名（C++11）
__cplusplus   // C++ 标准版本宏

// C++ 推荐使用 const/constexpr 替代宏常量
// 使用 inline 函数或模板替代宏函数
template<typename T>
inline T square(T x) { return x * x; }  // 类型安全，无副作用</code></pre>
</div>

<h2>编译链接原理</h2>
<div class="callout note">
  <div class="callout-icon">📘 C++ 编译流程</div>
  <p><strong>预处理</strong>：展开 #include、宏替换 → <strong>编译</strong>：生成汇编代码 → <strong>汇编</strong>：生成目标文件(.o/.obj) → <strong>链接</strong>：合并目标文件和库，生成可执行文件</p>
</div>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 单文件编译
g++ main.cpp -o program

# 多文件分别编译再链接
g++ -c main.cpp -o main.o        # -c 只编译不链接
g++ -c utils.cpp -o utils.o
g++ main.o utils.o -o program    # 链接

# 常用选项
# -std=c++20    指定 C++20 标准
# -O0/-O1/-O2/-O3  优化级别（O3 最高，但编译慢）
# -Wall -Wextra  显示所有警告
# -g            生成调试信息（供 GDB 使用）
# -I./include   添加头文件搜索路径
# -L./lib       添加库文件搜索路径
# -l库名        链接库（如 -lpthread, -lssl）
# -D宏名        定义预处理宏（如 -DDEBUG）
# -E            只进行预处理（查看宏展开结果）</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 学习建议</div>
  <p>恭喜完成 C++ 全栈教程！建议下一步：<br>1. 实践项目：实现一个文本编辑器、小游戏或网络工具<br>2. 深入 STL 源码：阅读 SGI STL 或 libc++ 实现<br>3. 学习设计模式：在 C++ 中应用 23 种设计模式<br>4. 关注 C++23/C++26 新特性演进</p>
</div>
`,
    exercises: [{"type": "choice", "question": "dynamic_cast 需要什么条件？", "options": ["类型相同", "有虚函数", "类型大小相同", "无要求"], "answer": "1"}, {"type": "truefalse", "question": "std::atomic 的操作是无锁的。", "answer": "false"}, {"type": "fillblank", "question": "将 double 截断为 int 应该使用 _______cast。", "answer": "static"}, {"type": "output", "code": "std::atomic<int> a(5);\na.fetch_add(3);\nstd::cout << a.load();", "options": ["5", "3", "8", "编译错误"], "answer": "2"}, {"type": "choice", "question": "编译流程的正确顺序是？", "options": ["编译→预处理→链接→汇编", "预处理→编译→汇编→链接", "链接→编译→预处理→汇编", "汇编→编译→预处理→链接"], "answer": "1"}]
  },
  {
    id: "ch15",
    title: "第15章：Make 与 CMake",
    icon: "🔧",
    summary: "构建系统基础、Makefile 语法与 CMake 跨平台构建",
    topics: ["Make", "CMake", "构建系统", "编译"],
    content: `
<h2>为什么需要构建系统？</h2>
<p>当项目只有几个文件时，手动编译还可以接受：</p>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>g++ main.cpp utils.cpp -o myapp</code></pre>
</div>

<p>但当项目变大时，手动编译会变得复杂：</p>
<ul>
  <li>几十个甚至上百个源文件</li>
  <li>复杂的依赖关系（改了头文件需要重新编译哪些 cpp？）</li>
  <li>不同的编译选项（Debug/Release、不同平台）</li>
  <li>链接外部库（OpenSSL、Boost 等）</li>
  <li>生成器代码（protobuf、flex/bison）</li>
</ul>

<p><strong>构建系统</strong>自动化了这些工作，只重新编译改动的文件，管理编译选项和依赖关系。</p>

<h2>Make 基础</h2>
<p>Make 是最经典的构建工具，通过读取 <code>Makefile</code> 文件中的规则来构建项目。</p>

<h3>Makefile 基本语法</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Makefile</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 目标: 依赖
# [Tab]命令

# 最终可执行文件
myapp: main.o utils.o
	g++ main.o utils.o -o myapp

# 目标文件：依赖 main.cpp 和 utils.h
main.o: main.cpp utils.h
	g++ -c main.cpp -o main.o

# 目标文件
utils.o: utils.cpp utils.h
	g++ -c utils.cpp -o utils.o

# 清理规则
.PHONY: clean
clean:
	rm -f *.o myapp</code></pre>
</div>

<h3>Makefile 变量</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Makefile</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 变量定义
CXX = g++                    # C++ 编译器
CXXFLAGS = -std=c++20 -Wall -g -O2  # 编译选项
LDFLAGS =                    # 链接选项
TARGET = myapp               # 目标程序名

# 源文件列表
SRCS = main.cpp utils.cpp math.cpp
OBJS = $(SRCS:.cpp=.o)      # 将 .cpp 替换为 .o

# 模式规则：%.o 表示任意 .o 文件
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# 自动推导依赖（需要 gcc -MM）
-include $(SRCS:.cpp=.d)
%.d: %.cpp
	$(CXX) -MM $(CXXFLAGS) $< > $@

# 最终链接
$(TARGET): $(OBJS)
	$(CXX) $(OBJS) -o $@ $(LDFLAGS)

.PHONY: clean all
clean:
	rm -f $(OBJS) $(TARGET) *.d

all: $(TARGET)</code></pre>
</div>

<table>
  <tr><th>自动变量</th><th>含义</th></tr>
  <tr><td><code>$@</code></td><td>目标文件名</td></tr>
  <tr><td><code>$&lt;</code></td><td>第一个依赖文件</td></tr>
  <tr><td><code>$^</code></td><td>所有依赖文件（去重）</td></tr>
  <tr><td><code>$+</code></td><td>所有依赖文件（保留重复）</td></tr>
  <tr><td><code>$?</code></td><td>比目标新的依赖文件</td></tr>
</table>

<div class="callout tip">
  <div class="callout-icon">💡 Make 使用建议</div>
  <p>1. 使用 <code>.PHONY</code> 标记伪目标（不生成文件的目标）<br>2. 用变量统一管理编译器和选项<br>3. 用模式规则 <code>%.o: %.cpp</code> 简化规则编写<br>4. 用 <code>gcc -MM</code> 自动生成头文件依赖</p>
</div>

<h2>CMake 跨平台构建</h2>
<p>CMake 是一个<strong>元构建系统</strong>：它不直接编译代码，而是生成平台原生的构建文件（Makefile、Visual Studio 项目、Ninja 构建文件等）。</p>

<h3>CMake 入门</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">cmake</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># CMakeLists.txt - CMake 配置文件

# 最低 CMake 版本要求
cmake_minimum_required(VERSION 3.14)

# 项目名称和版本
project(MyApp VERSION 1.0 LANGUAGES CXX)

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# 添加编译选项
if(MSVC)
    add_compile_options(/W4 /WX)
else()
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# 定义可执行文件
add_executable(myapp
    src/main.cpp
    src/utils.cpp
    src/math.cpp
)

# 添加头文件搜索路径
target_include_directories(myapp PRIVATE include)

# 链接库
target_link_libraries(myapp PRIVATE pthread ssl crypto)

# 定义编译宏
target_compile_definitions(myapp PRIVATE DEBUG_MODE)</code></pre>
</div>

<h3>CMake 构建流程</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 1. 创建构建目录（out-of-source 构建，推荐）
mkdir build && cd build

# 2. 配置（生成构建文件）
cmake ..                    # 使用默认生成器

cmake .. -G Ninja         # 指定 Ninja 生成器（更快）
cmake .. -G "Visual Studio 17 2022"  # Windows
cmake .. -DCMAKE_BUILD_TYPE=Release  # Release 模式

# 3. 编译
cmake --build .           # 编译所有目标
cmake --build . --target myapp  # 只编译指定目标

# 4. 运行
./myapp

# 5. 安装（可选）
cmake --install . --prefix /usr/local</code></pre>
</div>

<h3>CMake 进阶特性</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">cmake</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 创建库
add_library(mylib STATIC src/mylib.cpp)  # 静态库
add_library(mylib SHARED src/mylib.cpp)  # 动态库

# 库的链接关系
target_link_libraries(myapp PRIVATE mylib)
# PUBLIC    - 依赖传递给使用者
# PRIVATE   - 仅内部使用
# INTERFACE - 仅头文件依赖

# 查找外部库
find_package(OpenSSL REQUIRED)
if(OpenSSL_FOUND)
    target_link_libraries(myapp PRIVATE OpenSSL::SSL OpenSSL::Crypto)
endif()

# 查找 pkg-config 管理的库
find_package(PkgConfig REQUIRED)
pkg_check_modules(JSONCPP jsoncpp REQUIRED)
target_link_libraries(myapp PRIVATE \${JSONCPP_LIBRARIES})

# 条件编译
option(ENABLE_TESTING "Build tests" ON)
if(ENABLE_TESTING)
    enable_testing()
    add_subdirectory(tests)
endif()

# 文件操作
file(GLOB SOURCES "src/*.cpp")  # 不推荐！CMake 无法检测新文件
file(COPY config.ini DESTINATION \${CMAKE_BINARY_DIR})

# 安装规则
install(TARGETS myapp DESTINATION bin)
install(FILES README.md DESTINATION share/doc/myapp)

# 打包
include(CPack)
set(CPACK_PACKAGE_NAME "MyApp")</code></pre>
</div>

<h2>现代 CMake 最佳实践</h2>
<table>
  <tr><th>传统 CMake</th><th>现代 CMake（3.0+）</th></tr>
  <tr><td><code>include_directories(...)</code></td><td><code>target_include_directories(target ...)</code></td></tr>
  <tr><td><code>add_definitions(...)</code></td><td><code>target_compile_definitions(target ...)</code></td></tr>
  <tr><td><code>set(CMAKE_CXX_FLAGS "...")</code></td><td><code>target_compile_options(target ...)</code></td></tr>
  <tr><td><code>link_libraries(...)</code></td><td><code>target_link_libraries(target ...)</code></td></tr>
  <tr><td>全局变量满天飞</td><td>以 target 为中心，属性绑定到目标</td></tr>
</table>

<div class="callout note">
  <div class="callout-icon">📘 目录结构建议</div>
  <pre><code>myproject/
├── CMakeLists.txt      # 根 CMake 文件
├── include/
│   └── myproject/
│       └── utils.h
├── src/
│   ├── main.cpp
│   └── utils.cpp
├── third_party/        # 外部依赖
├── build/              # 构建目录（不提交到 git）
└── tests/              # 测试代码
    └── CMakeLists.txt</code></pre>
</div>

<h2>对比：Make vs CMake</h2>
<table>
  <tr><th>特性</th><th>Make</th><th>CMake</th></tr>
  <tr><td>跨平台</td><td>主要在 Unix/Linux</td><td>所有平台</td></tr>
  <tr><td>生成器</td><td>直接编译</td><td>生成 Makefile/VS/Ninja</td></tr>
  <tr><td>库管理</td><td>手动</td><td>find_package 自动查找</td></tr>
  <tr><td>IDE 支持</td><td>有限</td><td>主流 IDE 原生支持</td></tr>
  <tr><td>学习曲线</td><td>较缓</td><td>中等</td></tr>
  <tr><td>适用场景</td><td>小型项目、系统工具</td><td>中大型项目、跨平台</td></tr>
</table>

<div class="callout tip">
  <div class="callout-icon">💡 选择建议</div>
  <p>小型项目（&lt;10 个文件）：直接用 g++ 或简单 Makefile<br>中型项目（10-100 个文件）：CMake<br>大型项目/跨平台：CMake + Ninja<br>系统级/内核模块：Make 或专用构建系统</p>
</div>
`,
    exercises: [{"type": "choice", "question": "CMake 是什么类型的工具？", "options": ["编译器", "元构建系统", "IDE", "调试器"], "answer": "1"}, {"type": "truefalse", "question": "在 Makefile 中，$@ 表示目标文件名。", "answer": "true"}, {"type": "fillblank", "question": "CMake 的入口配置文件名称是 ______。", "answer": "CMakeLists.txt"}, {"type": "output", "code": "# Makefile\n.PHONY: all\nall:\n\techo \"building\"\n# 运行 make 后输出什么？", "options": ["building", "echo building", "all", "编译错误"], "answer": "1"}, {"type": "choice", "question": "现代 CMake 推荐用哪个命令给目标添加头文件路径？", "options": ["include_directories", "target_include_directories", "add_definitions", "set(CMAKE_INCLUDE_PATH)"], "answer": "1"}]
  }
,
  {
    id: "ch16",
    title: "第16章：现代 C++ 工程构建",
    subtitle: "CMake 与 vcpkg",
    icon: "🔧",
    summary: "掌握现代 CMake Target-based 构建范式，使用 vcpkg 和 Conan 管理第三方依赖",
    version: "",
    topics: ["CMake", "vcpkg", "构建系统", "Conan"],
    content: `
<h2>为什么需要构建系统？</h2>
<p>当项目从单个 <code>main.cpp</code> 扩展到数十个文件、依赖多个第三方库时，手动管理编译命令变得不可维护。构建系统解决以下问题：</p>
<ul>
  <li><strong>依赖追踪</strong>：修改头文件后，只重新编译受影响的源文件</li>
  <li><strong>跨平台</strong>：同一套配置在 Linux、macOS、Windows 上都能构建</li>
  <li><strong>库管理</strong>：自动查找和链接第三方库（fmt、Boost、OpenSSL 等）</li>
  <li><strong>多配置</strong>：Debug/Release/RelWithDebInfo 等不同构建类型</li>
</ul>

<div class="callout tip">
  <div class="callout-icon">💡 构建系统演进</div>
  <p>手写命令 → Makefile → Autotools → CMake → 现代 CMake（Target-based）。现代 CMake（3.0+）摒弃了全局变量，采用以 Target 为中心的声明式范式。</p>
</div>

<h2>现代 CMake Target-based 范式</h2>
<p>传统 CMake 使用全局变量（如 <code>include_directories</code>、<code>link_libraries</code>），导致依赖关系不清晰。现代 CMake 将<strong>所有属性绑定到 Target</strong>上，每个 Target 自描述其接口。</p>

<table>
  <tr><th>传统 CMake（不推荐）</th><th>现代 CMake（推荐）</th></tr>
  <tr><td><code>include_directories(./include)</code></td><td><code>target_include_directories(tgt PRIVATE ./include)</code></td></tr>
  <tr><td><code>add_definitions(-DDEBUG)</code></td><td><code>target_compile_definitions(tgt PRIVATE DEBUG)</code></td></tr>
  <tr><td><code>set(CMAKE_CXX_FLAGS "-Wall")</code></td><td><code>target_compile_options(tgt PRIVATE -Wall)</code></td></tr>
  <tr><td><code>link_libraries(pthread)</code></td><td><code>target_link_libraries(tgt PRIVATE pthread)</code></td></tr>
</table>

<h3>核心命令：add_executable 与 target_link_libraries</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">cmake</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># CMakeLists.txt - 最小可运行示例
cmake_minimum_required(VERSION 3.20)
project(HelloCMake VERSION 1.0 LANGUAGES CXX)

# 设置 C++20 标准
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 定义可执行文件目标
add_executable(hello src/main.cpp src/utils.cpp)

# 给目标绑定属性（不是全局变量！）
target_include_directories(hello PRIVATE include)
target_compile_options(hello PRIVATE -Wall -Wextra)
target_compile_definitions(hello PRIVATE PROJECT_NAME="HelloCMake")</code></pre>
</div>

<h2>PUBLIC / PRIVATE / INTERFACE 可见性语义</h2>
<p>这是现代 CMake 的核心概念，理解这三者的区别至关重要：</p>

<table>
  <tr><th>关键字</th><th>含义</th><th>使用场景</th></tr>
  <tr><td><code>PRIVATE</code></td><td>仅当前目标内部使用</td><td>实现文件依赖的头文件路径</td></tr>
  <tr><td><code>PUBLIC</code></td><td>当前目标使用 + 传递给依赖该目标的其他目标</td><td>头文件库（header-only）的 include 路径</td></tr>
  <tr><td><code>INTERFACE</code></td><td>不用于当前目标，仅传递给使用者</td><td>纯接口定义（如编译警告选项）</td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">cmake</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 库目标：mylib（静态库）
add_library(mylib STATIC src/mylib.cpp)
target_include_directories(mylib PUBLIC include)   # 使用者也需要这些头文件
target_link_libraries(mylib PRIVATE zlib)          # 仅内部使用 zlib

# 可执行文件：app
add_executable(app src/main.cpp)
target_link_libraries(app PUBLIC mylib)            # app 自动获得 mylib 的 PUBLIC 属性

# 分析：
# - app 可以使用 mylib/include 下的头文件（因为 mylib 标记为 PUBLIC）
# - app 不需要链接 zlib（因为 mylib 标记为 PRIVATE）
# - 如果 mylib 改为 INTERFACE 依赖 zlib，app 也会链接 zlib</code></pre>
</div>

<div class="callout note">
  <div class="callout-icon">📘 传递性依赖</div>
  <p>可见性控制实现了<strong>传递性依赖管理</strong>：当 target A 链接 target B 时，A 自动获得 B 的 PUBLIC 和 INTERFACE 属性，但不会获得 B 的 PRIVATE 属性。这使得大型项目的依赖关系清晰可维护。</p>
</div>

<h2>vcpkg 包管理器</h2>
<p><strong>vcpkg</strong> 是微软开发的开源 C++ 包管理器，支持跨平台安装和管理第三方库。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 安装 vcpkg
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh        # Linux/macOS
.\bootstrap-vcpkg.bat       # Windows

# 安装库
./vcpkg install fmt         # 安装 fmt 库
./vcpkg install nlohmann-json --triplet x64-linux

# 查看已安装列表
./vcpkg list

# 在 CMake 中使用 vcpkg
# 方法1：使用 vcpkg 工具链文件
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake

# 方法2：在 CMakeLists.txt 中集成
set(CMAKE_TOOLCHAIN_FILE "\${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
    CACHE STRING "Vcpkg toolchain file")</code></pre>
</div>

<h2>Conan 简介</h2>
<p><strong>Conan</strong> 是另一个流行的 C++ 包管理器，使用 Python 风格的配置文件（conanfile.py 或 conanfile.txt）。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">ini</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># conanfile.txt - 声明依赖
[requires]
fmt/10.2.1
spdlog/1.13.0

[generators]
CMakeDeps
CMakeToolchain

# 安装依赖
conan install . --output-folder=build --build=missing

# 构建
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=build/conan_toolchain.cmake
cmake --build build</code></pre>
</div>

<h2>实践：创建使用 fmt 库的 CMake 项目</h2>
<p>下面是一个完整的项目，演示 CMake + vcpkg + fmt 的完整工作流。</p>

<h3>项目结构</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Text</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>fmt-demo/
├── CMakeLists.txt
├── src/
│   └── main.cpp
└── vcpkg.json          # vcpkg 清单文件（声明依赖）</code></pre>
</div>

<h3>vcpkg.json</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">json</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>{
  "name": "fmt-demo",
  "version": "1.0.0",
  "dependencies": [
    "fmt"
  ]
}</code></pre>
</div>

<h3>CMakeLists.txt</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">cmake</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>cmake_minimum_required(VERSION 3.20)
project(FmtDemo VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 查找 fmt 库
find_package(fmt CONFIG REQUIRED)

add_executable(fmt_demo src/main.cpp)

# 链接 fmt 库 - PUBLIC 因为 fmt 的头文件在接口中暴露
target_link_libraries(fmt_demo PUBLIC fmt::fmt)</code></pre>
</div>

<h3>src/main.cpp</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;fmt/format.h&gt;
#include &lt;fmt/ranges.h&gt;
#include &lt;vector&gt;
#include &lt;string&gt;

int main() {
    // 基本格式化
    fmt::print("Hello, {}!\n", "CMake");

    // 格式化到字符串
    std::string s = fmt::format("The answer is {}", 42);

    // 格式化容器
    std::vector&lt;int&gt; vec = {1, 2, 3, 4, 5};
    fmt::print("Vector: {}\n", vec);

    // 格式化选项
    fmt::print("Pi = {:.5f}\n", 3.14159265359);

    return 0;
}</code></pre>
</div>

<h3>构建命令</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 使用 vcpkg 工具链构建
cmake -B build -S . \
    -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake

# 编译
cmake --build build

# 运行
./build/fmt_demo</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 现代 CMake 检查清单</div>
  <p>✅ 使用 <code>target_*</code> 命令替代全局变量<br>✅ 正确设置 PUBLIC/PRIVATE/INTERFACE<br>✅ 用 <code>find_package</code> 查找外部库<br>✅ 用 vcpkg/Conan 管理第三方依赖<br>✅ 使用 out-of-source 构建（build 目录）</p>
</div>
`,
    exercises: [
      {"type": "choice", "question": "现代 CMake 推荐用哪个命令给目标添加头文件搜索路径？", "options": ["include_directories()", "target_include_directories()", "add_definitions()", "set(CMAKE_INCLUDE_PATH)"], "answer": "1"},
      {"type": "truefalse", "question": "CMake 中 PRIVATE 属性的依赖会传递给链接该目标的其他目标。", "answer": "false"},
      {"type": "fillblank", "question": "CMake 中，当库的头文件需要被使用者包含时，应该使用 ______ 可见性。", "answer": "PUBLIC"},
      {"type": "choice", "question": "vcpkg 的清单文件名是什么？", "options": ["package.json", "vcpkg.json", "conanfile.txt", "CMakeLists.txt"], "answer": "1"},
      {"type": "choice", "question": "在 CMake 中，哪个命令用于查找已安装的第三方库？", "options": ["search_package()", "find_package()", "lookup_library()", "import_target()"], "answer": "1"},
      {"type": "truefalse", "question": " INTERFACE 可见性表示属性仅传递给依赖当前目标的其他目标，但不用于当前目标本身。", "answer": "true"}
    ]
  },
  {
    id: "ch17",
    title: "第17章：调试与性能分析",
    subtitle: "GDB 与 Valgrind",
    icon: "🐛",
    summary: "学习 GDB 调试、Valgrind 内存泄漏检测、AddressSanitizer 和 perf 性能分析",
    version: "",
    topics: ["GDB", "Valgrind", "AddressSanitizer", "perf"],
    content: `
<h2>GDB 基础</h2>
<p><strong>GDB</strong>（GNU Debugger）是 C/C++ 程序最强大的调试工具。要使用 GDB，编译时必须加上 <code>-g</code> 选项生成调试信息。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 编译时添加调试信息（-g），关闭优化（-O0）
g++ -std=c++20 -g -O0 main.cpp -o debug_app

# 启动 GDB
gdb ./debug_app

# 常用启动方式
gdb -q ./debug_app              # 静默启动（不显示版本信息）
gdb ./debug_app core            # 分析 core dump
gdb -p PID                      # 附加到运行中的进程</code></pre>
</div>

<h3>断点（Breakpoint）</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">GDB</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 设置断点
(gdb) break main               # 在 main 函数处断点
(gdb) break 42                 # 在第 42 行断点
(gdb) break myfile.cpp:55      # 在指定文件的第 55 行
(gdb) break Class::method      # 在成员函数处断点

# 条件断点
(gdb) break 30 if x > 100      # 仅当条件满足时中断
(gdb) break func if i == 5

# 临时断点（命中一次后自动删除）
(gdb) tbreak 20

# 查看和管理断点
(gdb) info breakpoints         # 列出所有断点
(gdb) delete 2                 # 删除编号为 2 的断点
(gdb) disable 1                # 禁用断点
(gdb) enable 1                 # 启用断点</code></pre>
</div>

<h3>单步执行</h3>
<table>
  <tr><th>命令</th><th>缩写</th><th>作用</th></tr>
  <tr><td><code>run</code></td><td><code>r</code></td><td>开始运行程序</td></tr>
  <tr><td><code>continue</code></td><td><code>c</code></td><td>继续运行直到下一个断点</td></tr>
  <tr><td><code>next</code></td><td><code>n</code></td><td>单步执行（不进入函数内部）</td></tr>
  <tr><td><code>step</code></td><td><code>s</code></td><td>单步执行（进入函数内部）</td></tr>
  <tr><td><code>finish</code></td><td></td><td>运行直到当前函数返回</td></tr>
  <tr><td><code>until</code></td><td></td><td>运行直到当前循环结束</td></tr>
</table>

<h3>查看变量</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">GDB</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>(gdb) print x                  # 打印变量 x 的值
(gdb) print *ptr               # 打印指针指向的内容
(gdb) print arr[5]@10          # 打印数组 arr 从第 5 个元素开始的 10 个值
(gdb) print/x x                # 以十六进制打印
(gdb) display x                # 每次断点都自动显示 x
(gdb) info locals              # 显示所有局部变量
(gdb) info args                # 显示函数参数

# 查看调用栈
(gdb) backtrace                # 显示完整调用栈（bt）
(gdb) backtrace 10             # 只显示前 10 层
(gdb) frame 2                  # 切换到第 2 层栈帧
(gdb) up / down                # 在栈帧间上下移动</code></pre>
</div>

<h2>Valgrind 内存调试</h2>
<p><strong>Valgrind</strong> 是一套内存调试和性能分析工具，最常用的子工具是 <code>memcheck</code>，用于检测内存错误。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 检测内存泄漏（程序运行较慢，属于正常）
valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes ./myapp

# 参数说明：
# --leak-check=full      详细的泄漏信息
# --show-leak-kinds=all  显示所有类型的泄漏
# --track-origins=yes    追踪未初始化值的来源
# --vgdb=yes             与 GDB 联合调试</code></pre>
</div>

<h3>Valgrind 能检测的错误</h3>
<table>
  <tr><th>错误类型</th><th>说明</th><th>示例</th></tr>
  <tr><td>非法内存访问</td><td>读写未分配或已释放的内存</td><td><code>delete ptr; *ptr = 5;</code></td></tr>
  <tr><td>使用未初始化内存</td><td>使用未初始化的变量做判断</td><td><code>int x; if (x > 0) ...</code></td></tr>
  <tr><td>双重释放</td><td>同一块内存释放两次</td><td><code>delete p; delete p;</code></td></tr>
  <tr><td>内存泄漏</td><td>分配后未释放且无法访问</td><td><code>new int(42); // 无对应 delete</code></td></tr>
  <tr><td>不匹配的 new/delete</td><td><code>new[]</code> 配 <code>delete</code> 或反之</td><td><code>new int[10]; delete p;</code></td></tr>
</table>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 有内存泄漏的程序示例
void leak_example() {
    int* p = new int(42);      // 分配内存
    // 忘记 delete，造成内存泄漏
}

int main() {
    for (int i = 0; i < 1000; i++) {
        leak_example();        // 每次调用泄漏 4 字节
    }
    return 0;
}

// Valgrind 输出示例：
// ==12345== HEAP SUMMARY:
// ==12345==     in use at exit: 4,000 bytes in 1,000 blocks
// ==12345==   total heap usage: 1,000 allocs, 0 frees, 4,000 bytes allocated
// ==12345== 
// ==12345== 4,000 bytes in 1,000 blocks are definitely lost
// ==12345==    at operator new (vg_replace_malloc.c:...)
// ==12345==    by leak_example() (main.cpp:3)</code></pre>
</div>

<h2>AddressSanitizer (ASan)</h2>
<p><strong>AddressSanitizer</strong> 是编译器内置的内存错误检测工具，比 Valgrind 速度快（约 2x  slowdown vs 10-20x），但需要在编译时启用。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># GCC/Clang 启用 AddressSanitizer
g++ -std=c++20 -g -fsanitize=address -fno-omit-frame-pointer main.cpp -o asan_app

# 运行（自动检测内存错误）
./asan_app

# 同时启用 LeakSanitizer（默认开启）和 UndefinedBehaviorSanitizer
g++ -std=c++20 -g -fsanitize=address,undefined main.cpp -o full_san_app</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 ASan vs Valgrind</div>
  <p><strong>ASan</strong>：编译时插入检查代码，速度快（~2x），能检测栈/堆溢出、use-after-free，推荐日常开发使用。<br><strong>Valgrind</strong>：无需重新编译，检测更细致（缓存行为、锁竞争），但速度慢（~10-20x），适合 CI 和深度分析。</p>
</div>

<h2>性能分析：perf</h2>
<p><strong>perf</strong> 是 Linux 内置的性能分析工具，利用 CPU 硬件计数器采集数据，开销极小。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 基本性能分析
perf record ./myapp              # 记录性能数据（生成 perf.data）
perf report                      # 查看报告（热点函数排序）

# 实时查看 top 函数
perf top -p $(pgrep myapp)

# 统计函数调用次数
perf stat -e cycles,instructions,cache-misses ./myapp

# 火焰图生成（需要 FlameGraph 工具）
perf record -g ./myapp
perf script | ./stackcollapse-perf.pl | ./flamegraph.pl > profile.svg</code></pre>
</div>

<h3>热点函数识别</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># perf report 输出示例
# Overhead  Command   Shared Object       Symbol
# ========  =======   ==============      ======
#  45.23%   myapp     myapp               slow_function
#  20.15%   myapp     libc.so.6           malloc
#  15.80%   myapp     myapp               compute_hash
#   8.40%   myapp     myapp               vector::push_back

# 优化策略：
# 1. 先优化占比最高的函数（45% 的函数加速 2x，整体加速 1.38x）
# 2. 减少动态内存分配（malloc 占比高说明内存分配是瓶颈）
# 3. 考虑算法复杂度优化（O(n^2) → O(n log n)）</code></pre>
</div>

<h2>综合调试技巧</h2>
<div class="callout tip">
  <div class="callout-icon">💡 调试流程建议</div>
  <p>1. <strong>开发阶段</strong>：始终用 <code>-fsanitize=address,undefined</code> 编译，提前捕获内存错误<br>2. <strong>功能调试</strong>：GDB 打断点 + 单步执行，理解程序执行流程<br>3. <strong>内存泄漏</strong>：Valgrind memcheck 确认无泄漏<br>4. <strong>性能优化</strong>：perf record/report 找到热点函数，针对性优化</p>
</div>

<div class="callout warning">
  <div class="callout-icon">⚠️ 常见陷阱</div>
  <p>• 用 <code>-O0</code> 编译后再用 GDB 调试，优化后的代码（<code>-O2</code>）会导致行号偏移和变量被优化掉<br>• ASan 和 Valgrind 不能同时使用（ASan 会抢占 Valgrind 的内存拦截机制）<br>• 多线程程序调试时，用 <code>info threads</code> 和 <code>thread N</code> 切换线程</p>
</div>
`,
    exercises: [
      {"type": "choice", "question": "GDB 中，哪个命令用于单步执行且不进入函数内部？", "options": ["step", "next", "continue", "run"], "answer": "1"},
      {"type": "truefalse", "question": "Valgrind 的 memcheck 工具可以检测内存泄漏和非法内存访问。", "answer": "true"},
      {"type": "fillblank", "question": "编译时添加 ______ 选项可以为 GDB 生成调试信息。", "answer": "-g"},
      {"type": "choice", "question": "AddressSanitizer 的运行时开销大约是？", "options": ["10-20 倍", "2 倍左右", "无开销", "50 倍以上"], "answer": "1"},
      {"type": "choice", "question": "在 GDB 中查看完整调用栈的命令是？", "options": ["info stack", "backtrace", "show frames", "list"], "answer": "1"},
      {"type": "truefalse", "question": "可以同时使用 AddressSanitizer 和 Valgrind 对同一程序进行内存检测。", "answer": "false"}
    ]
  },
  {
    id: "ch18",
    title: "第18章：C++23 新特性（上）",
    subtitle: "import std 与 std::format",
    icon: "✨",
    summary: "学习 C++23 标准库模块化导入和类型安全的字符串格式化",
    version: "C++23",
    topics: ["import std", "std::format", "模块", "编译速度"],
    content: `
<h2>标准库模块化：import std <span class="version-tag tag-cpp23">C++23</span></h2>
<p>C++20 引入了<strong>模块（Modules）</strong>系统，而 C++23 进一步标准化了<strong>标准库模块</strong> <code>std</code>，让你可以用一行 <code>import std;</code> 替代数百行 <code>#include</code>。</p>

<div class="callout tip">
  <div class="callout-icon">💡 模块的革命性意义</div>
  <p>头文件（<code>#include</code>）是 C++ 编译慢的主要元凶。每个 <code>.cpp</code> 文件都要重复解析相同的头文件（如 <code>&lt;iostream&gt;</code> 可能被解析数千次）。模块通过<strong>一次性编译、二进制导入</strong>彻底解决了这个问题。</p>
</div>

<h3>import std vs #include 对比</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// === 旧方式：大量 #include ===
#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;map&gt;
#include &lt;algorithm&gt;
#include &lt;memory&gt;
#include &lt;thread&gt;
#include &lt;mutex&gt;
#include &lt;chrono&gt;
#include &lt;format&gt;
// ... 可能还需要 20+ 个头文件

// === C++23 新方式：一行搞定 ===
import std;   // 导入整个标准库模块</code></pre>
</div>

<h3>编译速度提升原理</h3>
<p>模块的核心优势在于<strong>预编译模块单元（BMIs）</strong>：</p>
<table>
  <tr><th></th><th>#include 模型</th><th>模块模型</th></tr>
  <tr><td>解析方式</td><td>文本复制粘贴（每次重新解析）</td><td>导入预编译二进制（一次解析）</td></tr>
  <tr><td>宏泄漏</td><td><code>#define</code> 会泄漏到后续代码</td><td>模块不导出宏（除非显式）</td></tr>
  <tr><td>编译时间</td><td>O(n × m)，n=文件数, m=头文件数</td><td>O(n + m)，大幅缩短</td></tr>
  <tr><td>重复定义</td><td>头文件保护/pragma once 仍可能出问题</td><td>模块单元唯一，天然安全</td></tr>
</table>

<div class="callout note">
  <div class="callout-icon">📘 编译器支持状态</div>
  <p>截至 2024 年，GCC 14+、Clang 17+ 和 MSVC 19.38+ 已支持标准库模块。编译时需要特殊参数：<br>• GCC: <code>g++ -std=c++23 -fmodules-ts</code><br>• MSVC: <code>cl /std:c++23 /EHsc /exportHeader</code></p>
</div>

<h2>std::format 深度解析 <span class="version-tag tag-cpp20">C++20</span></h2>
<p><code>std::format</code> 是 C++20 引入的类型安全字符串格式化库，C++23 对其进行了扩展。它提供了类似 Python f-string 的语法，完全替代了不安全的 <code>printf</code> 和冗长的 <code>std::cout</code> 链式调用。</p>

<h3>旧方式 vs 新方式对比</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// === 旧方式 1：printf（类型不安全！）===
printf("Name: %s, Age: %d, Score: %.2f\n", name, age, score);
// 如果 %s 对应了 int，运行时崩溃！编译器不检查。

// === 旧方式 2：cout 链式调用（冗长）===
std::cout << "Name: " << name << ", Age: " << age 
          << ", Score: " << std::fixed << std::setprecision(2) << score << std::endl;

// === C++20 新方式：std::format（类型安全 + 简洁）===
import std;  // 或 #include &lt;format&gt;
std::string s = std::format("Name: {}, Age: {}, Score: {:.2f}", name, age, score);

// 直接输出
std::print("Hello, {}!\n", "World");        // C++23
cout << std::format("Hello, {}!\n", "World"); // C++20</code></pre>
</div>

<h3>格式化占位符语法</h3>
<p><code>std::format</code> 使用 Python 风格的 <code>{}</code> 占位符，支持位置参数、格式说明和填充对齐。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;format&gt;
#include &lt;iostream&gt;

// 基本占位符
std::format("{} + {} = {}", 1, 2, 3);        // "1 + 2 = 3"

// 位置参数（可以重复使用）
std::format("{0} {1} {0}", "A", "B");        // "A B A"

// 命名参数（C++23 扩展）
std::format("{name} is {age} years old", 
            std::format_args(std::make_format_args("name", "Alice", "age", 30)));

// === 格式说明符 ===
// 整数格式
std::format("{:d}", 42);         // "42"   十进制（默认）
std::format("{:x}", 255);        // "ff"   十六进制
std::format("{:X}", 255);        // "FF"   大写十六进制
std::format("{:o}", 8);          // "10"   八进制
std::format("{:b}", 5);          // "101"  二进制（C++23）

// 宽度与对齐
std::format("|{:10}|", 42);      // "|        42|"  右对齐（默认）
std::format("|{:<10}|", 42);     // "|42        |"  左对齐
std::format("|{:>10}|", 42);     // "|        42|"  右对齐
std::format("|{:^10}|", 42);     // "|   42     |"  居中对齐
std::format("|{:0>5}|", 42);     // "|00042|"       补零

// 浮点数精度
std::format("{:.2f}", 3.14159);  // "3.14"
std::format("{:.5f}", 3.14159);  // "3.14159"
std::format("{:.2e}", 1234.5);   // "1.23e+03" 科学计数法

// 带符号
std::format("{:+d}", 42);        // "+42"
std::format("{: d}", 42);        // " 42"（正数前加空格）</code></pre>
</div>

<h3>类型安全的字符串插值</h3>
<p><code>std::format</code> 在编译期检查格式字符串和参数的类型匹配，彻底杜绝了 <code>printf</code> 的类型不匹配崩溃问题。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// ✅ 编译通过：类型匹配
std::format("Name: {}, Age: {}", std::string("Alice"), 25);

// ❌ 编译错误：参数数量不匹配
std::format("{} {}", 1);              // 错误：需要 2 个参数，只提供了 1 个

// ❌ 编译错误：格式说明符与类型不匹配  
std::format("{:d}", "hello");         // 错误：{:d} 需要整数，但提供了字符串

// ❌ 编译错误：不支持的格式
std::format("{:x}", 3.14);            // 错误：{:x} 不支持浮点数

// ✅ 编译期检查意味着零运行时开销和零运行时错误风险
// 格式字符串在编译期解析，生成最优化的格式化代码</code></pre>
</div>

<h3>自定义类型的格式化</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;format&gt;

struct Point {
    double x, y;
};

// 特化 std::formatter
template&lt;&gt;
struct std::formatter&lt;Point&gt; {
    // 解析格式说明符
    constexpr auto parse(std::format_parse_context& ctx) {
        auto it = ctx.begin();
        if (it != ctx.end() && *it != '}') {
            // 可以解析自定义格式，如 "{.2f}"
            throw std::format_error("Invalid format");
        }
        return it;
    }

    // 格式化输出
    auto format(const Point& p, std::format_context& ctx) const {
        return std::format_to(ctx.out(), "({:.2f}, {:.2f})", p.x, p.y);
    }
};

// 使用
Point p{3.14159, 2.71828};
std::format("Point: {}", p);     // "Point: (3.14, 2.72)"</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 迁移建议</div>
  <p>新项目直接使用 <code>import std;</code> + <code>std::format</code>。遗留代码可以逐步替换：<br>1. 先用 <code>std::format</code> 替换 <code>printf/sprintf</code><br>2. 再用 <code>import std;</code> 替换 <code>#include</code> 块<br>3. 使用 <code>std::print</code>（C++23）替代 <code>std::cout &lt;&lt;</code> 链</p>
</div>
`,
    exercises: [
      {"type": "choice", "question": "C++23 中导入整个标准库模块的语法是？", "options": ["#include &lt;std&gt;", "import std;", "using namespace std;", "module std;"], "answer": "1"},
      {"type": "truefalse", "question": "std::format 在编译期检查格式字符串与参数的类型匹配。", "answer": "true"},
      {"type": "fillblank", "question": "std::format 中，二进制格式说明符是 ______。", "answer": "b"},
      {"type": "choice", "question": "模块相比 #include 的主要优势是？", "options": ["语法更短", "编译速度更快，无宏泄漏", "支持更多库", "运行时更快"], "answer": "1"},
      {"type": "choice", "question": "std::format(\"{:>6}\", 42) 的输出是？", "options": ["42    ", "    42", "  42  ", "000042"], "answer": "1"},
      {"type": "truefalse", "question": "C++23 的 import std 会导入标准库中的所有宏定义。", "answer": "false"}
    ]
  },
  {
    id: "ch19",
    title: "第19章：C++23 新特性（下）",
    subtitle: "高级特性",
    icon: "🚀",
    summary: "探索 deducing this、std::expected、flat_map、if consteval 和 std::mdspan",
    version: "C++23",
    topics: ["deducing this", "std::expected", "flat_map", "if consteval", "mdspan"],
    content: `
<h2>deducing this（显式对象参数）<span class="version-tag tag-cpp23">C++23</span></h2>
<p>C++23 引入了<strong>显式对象参数（explicit object parameter）</strong>，允许将 <code>this</code> 作为函数的第一个参数显式声明。这项特性消除了 const/非 const 成员函数重载的样板代码。</p>

<h3>问题：传统重载的冗余</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 传统方式：为 const 和非 const 各写一个重载
template&lt;typename T&gt;
class Container {
    std::vector&lt;T&gt; data_;
public:
    // 非 const 版本（可以修改返回值）
    T& operator[](size_t i) { return data_[i]; }

    // const 版本（只能读取）
    const T& operator[](size_t i) const { return data_[i]; }

    // 同样的重复适用于 front(), back(), begin(), end() ...
    T& front() { return data_.front(); }
    const T& front() const { return data_.front(); }

    T& back() { return data_.back(); }
    const T& back() const { return data_.back(); }
    // 重复 2x 代码量！
};</code></pre>
</div>

<h3>C++23 解决方案：deducing this</h3>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp23">C++23</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// C++23：一个函数替代所有重载
template&lt;typename T&gt;
class Container {
    std::vector&lt;T&gt; data_;
public:
    // Self&& 根据调用者的 const 性自动推导
    template&lt;typename Self&gt;
    auto&& operator[](this Self&& self, size_t i) {
        return std::forward&lt;Self&gt;(self).data_[i];
    }

    // 一个 front() 替代原来的两个重载
    template&lt;typename Self&gt;
    auto&& front(this Self&& self) {
        return std::forward&lt;Self&gt;(self).data_.front();
    }

    template&lt;typename Self&gt;
    auto&& back(this Self&& self) {
        return std::forward&lt;Self&gt;(self).data_.back();
    }
};

// 使用：自动选择正确的版本
Container&lt;int&gt; c;
c[0] = 42;              // 调用非 const 版本（返回 int&）
const auto& cc = c;
int x = cc[0];          // 调用 const 版本（返回 const int&）</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 工作原理</div>
  <p>当调用 <code>c[0]</code> 时（<code>c</code> 是非 const），<code>Self</code> 推导为 <code>Container&lt;int&gt;&</code>，返回 <code>int&</code>。<br>当调用 <code>cc[0]</code> 时（<code>cc</code> 是 const），<code>Self</code> 推导为 <code>const Container&lt;int&gt;&</code>，返回 <code>const int&</code>。</p>
</div>

<h2>std::expected <span class="version-tag tag-cpp23">C++23</span></h2>
<p><strong><code>std::expected&lt;T, E&gt;</strong></code> 是一种新的错误处理方式，类似于函数式编程中的 "Either" 单子。它在不抛异常的情况下表示"成功值 T 或错误值 E"。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp23">C++23</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;expected&gt;
#include &lt;string&gt;

// 返回成功值 int 或错误值 std::string
std::expected&lt;int, std::string&gt; divide(int a, int b) {
    if (b == 0) {
        return std::unexpected("Division by zero");
    }
    return a / b;  // 隐式构造为 expected（成功分支）
}

// 使用
auto result = divide(10, 2);
if (result) {                        // 检查是否成功
    std::cout &lt;&lt; "Result: " &lt;&lt; *result;  // 解引用获取值
} else {
    std::cout &lt;&lt; "Error: " &lt;&lt; result.error();
}

// 链式操作
auto r2 = divide(10, 2)
    .and_then([](int x) { return divide(x, 5); })   // 成功后继续
    .or_else([](auto& err) {                         // 失败后恢复
        std::cout &lt;&lt; "Fallback: " &lt;&lt; err;
        return std::expected&lt;int, std::string&gt;(0);
    })
    .transform([](int x) { return x * 2; });         // 成功时变换值</code></pre>
</div>

<h3>std::expected vs 异常 vs 错误码</h3>
<table>
  <tr><th></th><th>异常</th><th>错误码</th><th>std::expected</th></tr>
  <tr><td>语法开销</td><td>低（try/catch）</td><td>高（手动检查）</td><td>中（and_then/or_else）</td></tr>
  <tr><td>运行时开销</td><td>高（异常表、栈展开）</td><td>零</td><td>零（优化后与错误码等价）</td></tr>
  <tr><td>是否显式</td><td>隐式传播</td><td>完全显式</td><td>显式但流畅</td></tr>
  <tr><td>适用场景</td><td>真·异常情况</td><td>C 接口、嵌入式</td><td>预期内的错误处理</td></tr>
</table>

<h2>std::flat_map / std::flat_set <span class="version-tag tag-cpp23">C++23</span></h2>
<p><code>std::flat_map</code> 和 <code>std::flat_set</code> 是 C++23 新增的关联容器，用<strong>有序 vector</strong> 替代了传统的<strong>红黑树</strong>实现，牺牲 O(log n) 的插入换来了更好的<strong>数据局部性</strong>和<strong>缓存命中率</strong>。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp23">C++23</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;flat_map&gt;
#include &lt;flat_set&gt;

// flat_map：底层是有序的 std::vector&lt;std::pair&lt;Key, T&gt;&gt;
std::flat_map&lt;std::string, int&gt; scores;

// 接口与 std::map 相同
scores["Alice"] = 95;
scores["Bob"] = 87;
scores["Charlie"] = 92;

// 查找仍然是 O(log n)，但通过二分查找
auto it = scores.find("Bob");   // 二分查找

// 遍历：内存连续，缓存友好
for (const auto& [name, score] : scores) {
    std::cout &lt;&lt; name &lt;&lt; ": " &lt;&lt; score &lt;&lt; "\n";
}

// flat_set：底层是有序 vector
std::flat_set&lt;int&gt; ids = {3, 1, 4, 1, 5};
// ids = {1, 3, 4, 5}（自动去重并排序）</code></pre>
</div>

<h3>性能对比：flat_map vs map</h3>
<table>
  <tr><th>操作</th><th>std::map（红黑树）</th><th>std::flat_map（vector）</th></tr>
  <tr><td>插入</td><td>O(log n)</td><td>O(n)（需移动元素）</td></tr>
  <tr><td>查找</td><td>O(log n)，缓存不友好</td><td>O(log n)，缓存极友好</td></tr>
  <tr><td>遍历</td><td>指针跳转，cache miss 多</td><td>内存连续，预取高效</td></tr>
  <tr><td>内存</td><td>每个节点有指针开销</td><td>仅 key+value，无额外开销</td></tr>
  <tr><td>适用场景</td><td>频繁插入删除</td><td>少量修改 + 大量查找/遍历</td></tr>
</table>

<div class="callout note">
  <div class="callout-icon">📘 数据局部性原理</div>
  <p>CPU 从内存读取数据时，会一次性加载整个<strong>缓存行</strong>（通常 64 字节）。<code>flat_map</code> 的数据连续存储，一次缓存加载可以包含多个元素；而 <code>map</code> 的节点散落在堆上，每个节点访问都可能触发一次主内存访问（~100ns vs ~1ns L1 cache）。</p>
</div>

<h2>if consteval <span class="version-tag tag-cpp23">C++23</span></h2>
<p><code>if consteval</code> 是 C++23 引入的<strong>编译期条件分支</strong>，用于区分代码是在编译期求值（<code>consteval</code> 上下文）还是运行期执行。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp23">C++23</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// 一个函数同时支持编译期和运行期
constexpr int log2(int n) {
    if consteval {           // 仅在编译期求值时执行此分支
        // 编译期可以使用 assert
        static_assert(n > 0);  // 编译期断言
        int result = 0;
        while (n > 1) {
            n /= 2;
            result++;
        }
        return result;
    } else {                 // 仅在运行期执行此分支
        // 运行期可以使用异常
        if (n <= 0) throw std::invalid_argument("n must be positive");
        int result = 0;
        while (n > 1) {
            n /= 2;
            result++;
        }
        return result;
    }
}

// 编译期调用
constexpr auto c1 = log2(1024);    // OK，编译期求值
// auto r1 = log2(x);              // 运行期调用，异常可用</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 与 if constexpr 的区别</div>
  <p><code>if constexpr</code> 在<strong>实例化时</strong>丢弃分支（模板编译阶段）。<code>if consteval</code> 根据<strong>调用上下文</strong>选择分支（编译期求值 vs 运行期）。两者互补：<code>if constexpr</code> 用于模板控制，<code>if consteval</code> 用于编译期/运行期双路实现。</p>
</div>

<h2>std::mdspan <span class="version-tag tag-cpp23">C++23</span></h2>
<p><strong><code>std::mdspan</strong></code>（multi-dimensional span）是一个<strong>非拥有的多维数组视图</strong>，类似于 <code>std::span</code> 的多维扩展。它让你可以用多维索引语法操作底层的一维数组。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp23">C++23</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;mdspan&gt;

// 底层一维数组
int data[24] = {
     1,  2,  3,  4,     // 第 0 行
     5,  6,  7,  8,     // 第 1 行
     9, 10, 11, 12,     // 第 2 行
    13, 14, 15, 16,     // 第 3 行
    17, 18, 19, 20,     // 第 4 行
    21, 22, 23, 24      // 第 5 行
};

// 创建 2D 视图：6 行 × 4 列
std::mdspan&lt;int, std::extents&lt;size_t, 6, 4&gt;&gt; matrix(data);

// 使用二维索引访问（底层是一维数组）
matrix[2, 3] = 100;     // 第 3 行第 4 列（从 0 开始）
std::cout &lt;&lt; matrix[0, 0];   // 1
std::cout &lt;&lt; matrix[1, 2];   // 7

// 动态维度（运行时确定大小）
std::mdspan&lt;int, std::dextents&lt;size_t, 2&gt;&gt; dyn_matrix(data, 3, 8);
// 3 行 × 8 列的视图

// 获取维度信息
matrix.extent(0);       // 第 0 维大小 = 6（行数）
matrix.extent(1);       // 第 1 维大小 = 4（列数）
matrix.rank();          // 维度数 = 2

// 不同布局（内存排列方式）
std::layout_left::mapping&lt;std::dextents&lt;size_t, 2&gt;&gt; left_layout(4, 6);
// layout_left  = Fortran 风格（列优先）
// layout_right = C 风格（行优先，默认）</code></pre>
</div>

<div class="callout tip">
  <div class="callout-icon">💡 mdspan 的应用场景</div>
  <p>• <strong>科学计算</strong>：矩阵运算、有限元分析<br>• <strong>图像处理</strong>：将一维像素缓冲区视为 2D 图像<br>• <strong>游戏开发</strong>：3D 网格数据的可视化操作<br>• <strong>机器学习</strong>：多维张量视图的零拷贝操作</p>
</div>
`,
    exercises: [
      {"type": "choice", "question": "deducing this 主要解决了什么问题？", "options": ["虚函数调用开销", "const/非 const 成员函数重复定义", "模板编译错误", "内存管理"], "answer": "1"},
      {"type": "truefalse", "question": "std::flat_map 的底层实现是有序 vector 而非红黑树。", "answer": "true"},
      {"type": "fillblank", "question": "std::expected中 E 表示 ______。", "answer": "错误类型"},
      {"type": "choice", "question": "if consteval 与 if constexpr 的主要区别是？", "options": ["没有区别", "if consteval 根据调用上下文选择分支，if constexpr 在模板实例化时丢弃分支", "if consteval 更快", "if constexpr 是 C++23 特性"], "answer": "1"},
      {"type": "choice", "question": "std::mdspan 是什么类型的数据结构？", "options": ["拥有的多维数组", "非拥有的多维数组视图", "动态数组", "链表"], "answer": "1"},
      {"type": "truefalse", "question": "std::flat_map 的插入时间复杂度是 O(log n)。", "answer": "false"}
    ]
  },
  {
    id: "ch20",
    title: "第20章：从零构建 - 综合项目实战",
    subtitle: "命令行计算器",
    icon: "🏗️",
    summary: "综合运用 C++20/23 特性，从零构建一个支持变量、函数和复杂表达式的命令行计算器",
    version: "C++20/23",
    topics: ["项目实战", "计算器", "CMake", "综合运用"],
    content: `
<h2>项目需求</h2>
<p>我们将构建一个功能完善的<strong>命令行表达式计算器</strong>，支持以下特性：</p>
<ul>
  <li><strong>基本运算</strong>：加减乘除、括号优先级</li>
  <li><strong>变量系统</strong>：定义变量（<code>x = 10 + 5</code>），后续表达式中复用</li>
  <li><strong>内置函数</strong>：<code>sin</code>, <code>cos</code>, <code>sqrt</code>, <code>abs</code>, <code>pow</code></li>
  <li><strong>错误处理</strong>：语法错误提示、除零保护、未定义变量检测</li>
  <li><strong>REPL 交互</strong>：读取-求值-输出循环，支持命令历史</li>
</ul>

<div class="callout tip">
  <div class="callout-icon">💡 技术选型</div>
  <p>• 词法分析：手写的状态机<br>• 语法分析：递归下降解析器<br>• 存储：std::unordered_map 存储变量<br>• 错误处理：std::expected（C++23）或异常<br>• 格式化输出：std::format（C++20）</p>
</div>

<h2>项目结构</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Text</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>calc/
├── CMakeLists.txt
├── src/
│   ├── main.cpp           # 入口：REPL 循环
│   ├── lexer.h/.cpp       # 词法分析器（Token 序列）
│   ├── parser.h/.cpp      # 语法分析器（AST 构建）
│   ├── evaluator.h/.cpp   # AST 求值器
│   └── environment.h/.cpp # 变量存储环境
└── tests/
    └── test_calc.cpp      # 测试用例</code></pre>
</div>

<h2>CMakeLists.txt</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">cmake</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>cmake_minimum_required(VERSION 3.25)
project(CalcPP VERSION 1.0 LANGUAGES CXX)

# 需要 C++23（for std::expected, std::print, import std）
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# 启用模块支持（C++20 Modules）
set(CMAKE_CXX_SCAN_FOR_MODULES ON)

add_executable(calc
    src/main.cpp
    src/lexer.cpp
    src/parser.cpp
    src/evaluator.cpp
    src/environment.cpp
)

target_include_directories(calc PRIVATE src)

# 编译选项
if(MSVC)
    target_compile_options(calc PRIVATE /W4)
else()
    target_compile_options(calc PRIVATE -Wall -Wextra -Wpedantic)
endif()

# 测试
enable_testing()
add_executable(test_calc tests/test_calc.cpp
    src/lexer.cpp
    src/parser.cpp
    src/evaluator.cpp
    src/environment.cpp
)
target_include_directories(test_calc PRIVATE src)
add_test(NAME CalcTest COMMAND test_calc)</code></pre>
</div>

<h2>lexer.h - 词法分析器</h2>
<p>词法分析器将输入字符串拆分为 Token 序列（数字、运算符、标识符等）。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#pragma once
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;optional&gt;
#include &lt;format&gt;

// Token 类型枚举
enum class TokenType {
    Number,      // 数字（整数或浮点数）
    Plus,        // +
    Minus,       // -
    Multiply,    // *
    Divide,      // /
    Power,       // ^
    LParen,      // (
    RParen,      // )
    Assign,      // =
    Identifier,  // 变量名或函数名
    Comma,       // ,
    Eof,         // 文件结束
};

struct Token {
    TokenType type;
    std::string lexeme;        // 原始文本
    double numericValue = 0;   // 如果是数字，存储其值
    size_t line = 1;
    size_t column = 1;
};

class Lexer {
    std::string_view source_;
    size_t pos_ = 0;
    size_t line_ = 1;
    size_t col_ = 1;

    char peek() const;
    char advance();
    bool isAtEnd() const;
    void skipWhitespace();
    std::optional&lt;Token&gt; readNumber();
    std::optional&lt;Token&gt; readIdentifier();

public:
    explicit Lexer(std::string_view source);
    std::vector&lt;Token&gt; tokenize();
};</code></pre>
</div>

<h2>lexer.cpp - 实现</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include "lexer.h"
#include &lt;cctype&gt;

Lexer::Lexer(std::string_view source) : source_(source) {}

char Lexer::peek() const {
    return isAtEnd() ? '\0' : source_[pos_];
}

char Lexer::advance() {
    char c = source_[pos_++];
    if (c == '\n') { line_++; col_ = 1; }
    else { col_++; }
    return c;
}

bool Lexer::isAtEnd() const { return pos_ >= source_.size(); }

void Lexer::skipWhitespace() {
    while (std::isspace(peek())) advance();
}

std::optional&lt;Token&gt; Lexer::readNumber() {
    size_t start = pos_;
    size_t startCol = col_;
    bool hasDot = false;

    while (std::isdigit(peek()) || (peek() == '.' && !hasDot)) {
        if (peek() == '.') hasDot = true;
        advance();
    }

    std::string numStr(source_.substr(start, pos_ - start));
    return Token{TokenType::Number, numStr, std::stod(numStr), line_, startCol};
}

std::optional&lt;Token&gt; Lexer::readIdentifier() {
    size_t start = pos_;
    size_t startCol = col_;

    while (std::isalnum(peek()) || peek() == '_') advance();

    std::string name(source_.substr(start, pos_ - start));
    return Token{TokenType::Identifier, name, 0, line_, startCol};
}

std::vector&lt;Token&gt; Lexer::tokenize() {
    std::vector&lt;Token&gt; tokens;

    while (!isAtEnd()) {
        skipWhitespace();
        if (isAtEnd()) break;

        char c = peek();
        size_t ccol = col_;

        if (std::isdigit(c)) {
            tokens.push_back(*readNumber());
        } else if (std::isalpha(c) || c == '_') {
            tokens.push_back(*readIdentifier());
        } else {
            advance(); // consume the char
            switch (c) {
                case '+': tokens.push_back({TokenType::Plus, "+", 0, line_, ccol}); break;
                case '-': tokens.push_back({TokenType::Minus, "-", 0, line_, ccol}); break;
                case '*': tokens.push_back({TokenType::Multiply, "*", 0, line_, ccol}); break;
                case '/': tokens.push_back({TokenType::Divide, "/", 0, line_, ccol}); break;
                case '^': tokens.push_back({TokenType::Power, "^", 0, line_, ccol}); break;
                case '(': tokens.push_back({TokenType::LParen, "(", 0, line_, ccol}); break;
                case ')': tokens.push_back({TokenType::RParen, ")", 0, line_, ccol}); break;
                case '=': tokens.push_back({TokenType::Assign, "=", 0, line_, ccol}); break;
                case ',': tokens.push_back({TokenType::Comma, ",", 0, line_, ccol}); break;
                default:
                    throw std::runtime_error(
                        std::format("Unexpected character '{}' at line {}, col {}",
                                   c, line_, ccol));
            }
        }
    }

    tokens.push_back({TokenType::Eof, "", 0, line_, col_});
    return tokens;
}</code></pre>
</div>

<h2>parser.h - 语法分析器</h2>
<p>使用<strong>递归下降</strong>方法构建抽象语法树（AST）。支持运算符优先级和括号。</p>

<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#pragma once
#include "lexer.h"
#include &lt;memory&gt;
#include &lt;vector&gt;

// AST 节点基类
struct Expr {
    virtual ~Expr() = default;
};

// 数字字面量
struct NumberExpr : Expr {
    double value;
    explicit NumberExpr(double v) : value(v) {}
};

// 变量引用
struct VariableExpr : Expr {
    std::string name;
    explicit VariableExpr(std::string n) : name(std::move(n)) {}
};

// 二元运算
struct BinaryExpr : Expr {
    TokenType op;
    std::unique_ptr&lt;Expr&gt; left;
    std::unique_ptr&lt;Expr&gt; right;
    BinaryExpr(TokenType o, std::unique_ptr&lt;Expr&gt; l, std::unique_ptr&lt;Expr&gt; r)
        : op(o), left(std::move(l)), right(std::move(r)) {}
};

// 一元运算（负号）
struct UnaryExpr : Expr {
    TokenType op;
    std::unique_ptr&lt;Expr&gt; operand;
    UnaryExpr(TokenType o, std::unique_ptr&lt;Expr&gt; expr)
        : op(o), operand(std::move(expr)) {}
};

// 函数调用
struct CallExpr : Expr {
    std::string funcName;
    std::vector&lt;std::unique_ptr&lt;Expr&gt;&gt; args;
    CallExpr(std::string name, std::vector&lt;std::unique_ptr&lt;Expr&gt;&gt; a)
        : funcName(std::move(name)), args(std::move(a)) {}
};

// 赋值语句
struct AssignExpr : Expr {
    std::string varName;
    std::unique_ptr&lt;Expr&gt; value;
    AssignExpr(std::string name, std::unique_ptr&lt;Expr&gt; v)
        : varName(std::move(name)), value(std::move(v)) {}
};

class Parser {
    std::vector&lt;Token&gt; tokens_;
    size_t pos_ = 0;

    const Token& peek() const;
    const Token& previous() const;
    bool check(TokenType type) const;
    bool match(std::initializer_list&lt;TokenType&gt; types);
    const Token& consume(TokenType type, const std::string& msg);

    std::unique_ptr&lt;Expr&gt; expression();   // 赋值
    std::unique_ptr&lt;Expr&gt; equality();     // 最低优先级
    std::unique_ptr&lt;Expr&gt; comparison();
    std::unique_ptr&lt;Expr&gt; term();
    std::unique_ptr&lt;Expr&gt; factor();
    std::unique_ptr&lt;Expr&gt; power();
    std::unique_ptr&lt;Expr&gt; unary();
    std::unique_ptr&lt;Expr&gt; primary();      // 最高优先级

public:
    explicit Parser(std::vector&lt;Token&gt; tokens);
    std::unique_ptr&lt;Expr&gt; parse();
};</code></pre>
</div>

<h2>evaluator.h/.cpp - 求值器</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#pragma once
#include "parser.h"
#include "environment.h"
#include &lt;cmath&gt;
#include &lt;format&gt;

class Evaluator {
    Environment& env_;

    double evalExpr(const Expr* expr);
    double evalBinary(const BinaryExpr* expr);
    double evalUnary(const UnaryExpr* expr);
    double evalCall(const CallExpr* expr);

public:
    explicit Evaluator(Environment& env) : env_(env) {}
    double evaluate(const Expr* expr);
};

// evaluator.cpp
#include "evaluator.h"

double Evaluator::evalBinary(const BinaryExpr* expr) {
    double left = evalExpr(expr->left.get());
    double right = evalExpr(expr->right.get());

    switch (expr->op) {
        case TokenType::Plus:  return left + right;
        case TokenType::Minus: return left - right;
        case TokenType::Multiply: return left * right;
        case TokenType::Divide: 
            if (right == 0.0) throw std::runtime_error("Division by zero");
            return left / right;
        case TokenType::Power: return std::pow(left, right);
        default: throw std::runtime_error("Unknown binary operator");
    }
}

double Evaluator::evalUnary(const UnaryExpr* expr) {
    double val = evalExpr(expr->operand.get());
    if (expr->op == TokenType::Minus) return -val;
    return val;
}

double Evaluator::evalCall(const CallExpr* expr) {
    std::vector&lt;double&gt; argVals;
    for (const auto& arg : expr->args) {
        argVals.push_back(evalExpr(arg.get()));
    }

    const auto& name = expr->funcName;
    if (name == "sin" && argVals.size() == 1) return std::sin(argVals[0]);
    if (name == "cos" && argVals.size() == 1) return std::cos(argVals[0]);
    if (name == "sqrt" && argVals.size() == 1) {
        if (argVals[0] < 0) throw std::runtime_error("sqrt of negative number");
        return std::sqrt(argVals[0]);
    }
    if (name == "abs" && argVals.size() == 1) return std::abs(argVals[0]);
    if (name == "pow" && argVals.size() == 2) return std::pow(argVals[0], argVals[1]);

    throw std::runtime_error(std::format("Unknown function '{}'", name));
}

double Evaluator::evalExpr(const Expr* expr) {
    if (auto* n = dynamic_cast&lt;const NumberExpr*&gt;(expr)) return n->value;
    if (auto* v = dynamic_cast&lt;const VariableExpr*&gt;(expr)) {
        auto val = env_.get(v->name);
        if (!val) throw std::runtime_error(std::format("Undefined variable '{}'", v->name));
        return *val;
    }
    if (auto* b = dynamic_cast&lt;const BinaryExpr*&gt;(expr)) return evalBinary(b);
    if (auto* u = dynamic_cast&lt;const UnaryExpr*&gt;(expr)) return evalUnary(u);
    if (auto* c = dynamic_cast&lt;const CallExpr*&gt;(expr)) return evalCall(c);
    if (auto* a = dynamic_cast&lt;const AssignExpr*&gt;(expr)) {
        double val = evalExpr(a->value.get());
        env_.set(a->varName, val);
        return val;
    }
    throw std::runtime_error("Unknown expression type");
}

double Evaluator::evaluate(const Expr* expr) {
    return evalExpr(expr);
}</code></pre>
</div>

<h2>environment.h - 变量环境</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#pragma once
#include &lt;string&gt;
#include &lt;unordered_map&gt;
#include &lt;optional&gt;

class Environment {
    std::unordered_map&lt;std::string, double&gt; variables_;

public:
    void set(const std::string& name, double value) {
        variables_[name] = value;
    }

    std::optional&lt;double&gt; get(const std::string& name) const {
        auto it = variables_.find(name);
        if (it != variables_.end()) return it->second;
        return std::nullopt;
    }

    bool has(const std::string& name) const {
        return variables_.contains(name);  // C++20
    }

    void clear() { variables_.clear(); }
};</code></pre>
</div>

<h2>main.cpp - REPL 入口</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp23">C++23</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;format&gt;
#include "lexer.h"
#include "parser.h"
#include "evaluator.h"
#include "environment.h"

void printWelcome() {
    std::cout &lt;&lt; "╔═══════════════════════════════════╗\n";
    std::cout &lt;&lt; "║      Calc++ - Expression Calc     ║\n";
    std::cout &lt;&lt; "║   Type 'quit' to exit, 'vars'     ║\n";
    std::cout &lt;&lt; "║   to list variables               ║\n";
    std::cout &lt;&lt; "╚═══════════════════════════════════╝\n\n";
}

int main() {
    printWelcome();
    Environment env;

    while (true) {
        std::cout &lt;&lt; "&gt; ";
        std::string line;
        if (!std::getline(std::cin, line)) break;

        if (line == "quit" || line == "exit") break;
        if (line.empty()) continue;

        try {
            Lexer lexer(line);
            auto tokens = lexer.tokenize();
            Parser parser(std::move(tokens));
            auto ast = parser.parse();
            Evaluator eval(env);
            double result = eval.evaluate(ast.get());

            std::cout &lt;&lt; "= " &lt;&lt; result &lt;&lt; "\n";
        } catch (const std::exception& e) {
            std::cout &lt;&lt; "[Error] " &lt;&lt; e.what() &lt;&lt; "\n";
        }
    }

    return 0;
}</code></pre>
</div>

<h2>运行演示</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">Bash</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code># 构建
cmake -B build -S .
cmake --build build

# 运行
./build/calc

# ╔═══════════════════════════════════╗
# ║      Calc++ - Expression Calc     ║
# ╚═══════════════════════════════════╝
# 
# &gt; 2 + 3 * 4
# = 14
# &gt; (2 + 3) * 4
# = 20
# &gt; x = 10 + 5
# = 15
# &gt; x * 2
# = 30
# &gt; sqrt(144) + pow(2, 3)
# = 20
# &gt; sin(3.14159 / 2)
# = 1
# &gt; y = 5 / 0
# [Error] Division by zero</code></pre>
</div>

<h2>测试用例</h2>
<div class="code-block">
  <div class="code-header">
    <div class="code-header-left"><span class="code-lang">C++</span><span class="version-tag tag-cpp20">C++20</span></div>
    <div class="code-actions"><button class="code-btn copy-btn">📋 复制</button></div>
  </div>
  <pre><code>// tests/test_calc.cpp
#include &lt;cassert&gt;
#include &lt;cmath&gt;
#include &lt;format&gt;
#include "../src/lexer.h"
#include "../src/parser.h"
#include "../src/evaluator.h"
#include "../src/environment.h"

double evalExpr(const std::string& input) {
    Lexer lexer(input);
    auto tokens = lexer.tokenize();
    Parser parser(std::move(tokens));
    auto ast = parser.parse();
    Environment env;
    Evaluator eval(env);
    return eval.evaluate(ast.get());
}

int main() {
    // 基本运算
    assert(evalExpr("2 + 3") == 5.0);
    assert(evalExpr("10 - 4") == 6.0);
    assert(evalExpr("3 * 7") == 21.0);
    assert(evalExpr("15 / 3") == 5.0);
    assert(std::abs(evalExpr("2 ^ 3") - 8.0) &lt; 0.001);

    // 优先级
    assert(evalExpr("2 + 3 * 4") == 14.0);
    assert(evalExpr("(2 + 3) * 4") == 20.0);
    assert(evalExpr("10 - 2 - 3") == 5.0);  // 左结合

    // 一元负号
    assert(evalExpr("-5 + 3") == -2.0);
    assert(evalExpr("-(-3)") == 3.0);

    // 函数调用
    assert(evalExpr("sqrt(16)") == 4.0);
    assert(evalExpr("abs(-5)") == 5.0);
    assert(std::abs(evalExpr("sin(0)") - 0.0) &lt; 0.001);
    assert(std::abs(evalExpr("pow(2, 3)") - 8.0) &lt; 0.001);

    // 变量赋值和引用
    {
        Lexer lexer("x = 10 + 5; x * 2");
        auto tokens = lexer.tokenize();
        Environment env;
        Evaluator eval(env);

        // 第一行：赋值
        Parser p1(std::vector(tokens.begin(), 
              std::find_if(tokens.begin(), tokens.end(), 
                  [](const Token& t) { return t.lexeme == ";"; }) + 1));
        auto ast1 = p1.parse();
        eval.evaluate(ast1.get());

        // 检查变量
        auto val = env.get("x");
        assert(val.has_value() && *val == 15.0);
    }

    std::cout &lt;&lt; "All tests passed!\n";
    return 0;
}</code></pre>
</div>

<h2>学到的知识点总结</h2>
<div class="callout tip">
  <div class="callout-icon">💡 本章节综合运用</div>
  <p>• <strong>C++20</strong>：concept（可添加）、结构化绑定、contains()、format<br>• <strong>C++23</strong>：import std（可选）、std::expected 可替换异常处理<br>• <strong>OOP</strong>：继承（Expr AST 节点体系）、多态（dynamic_cast）<br>• <strong>STL</strong>：vector、unordered_map、unique_ptr、optional<br>• <strong>CMake</strong>：Target-based 配置、测试集成<br>• <strong>工程实践</strong>：头文件组织、分离编译、单元测试</p>
</div>

<div class="callout note">
  <div class="callout-icon">📘 扩展方向</div>
  <p>• 添加更多数学函数（log, exp, tan, asin 等）<br>• 支持复数运算（std::complex）<br>• 添加命令历史（GNU readline）<br>• 实现用户自定义函数（lambda 存储）<br>• 将解析器改为 Pratt Parser 支持更多运算符</p>
</div>
`,
    exercises: []
  }
];
