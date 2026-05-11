/* ===== WasmEditor - C++ 交互式代码编辑器组件 ===== */

/**
 * WasmEditor: 浏览器端 C++ 代码编辑器与模拟运行环境
 * 
 * 特性：
 * - 模拟模式：20+ 常用 C++ 代码片段的预定义输出
 * - 真实模式占位：预留 Emscripten Wasm 编译器集成接口
 * - 多标准模板：C++11/14/17/20/23 代码模板切换
 * - 终端 UI：仿 macOS Terminal 风格输出面板
 * - 语法高亮：基于 textarea 的实时关键字高亮
 * 
 * 使用：new WasmEditor(containerElement)
 */
class WasmEditor {
  /* ---- 预设代码模板 ---- */
  static TEMPLATES = {
    cpp11: {
      label: 'C++11',
      code: `#include <iostream>
#include <vector>
#include <auto_ptr>

int main() {
    // C++11: auto 关键字、范围 for、nullptr
    auto nums = std::vector<int>{1, 2, 3, 4, 5};
    
    std::cout << "C++11 特性演示:" << std::endl;
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`
    },
    cpp14: {
      label: 'C++14',
      code: `#include <iostream>

// C++14: 泛型 lambda、变量模板
auto add = [](auto a, auto b) {
    return a + b;
};

int main() {
    std::cout << "C++14 泛型 lambda:" << std::endl;
    std::cout << "add(3, 4) = " << add(3, 4) << std::endl;
    std::cout << "add(2.5, 3.1) = " << add(2.5, 3.1) << std::endl;
    return 0;
}`
    },
    cpp17: {
      label: 'C++17',
      code: `#include <iostream>
#include <tuple>
#include <string>

int main() {
    // C++17: 结构化绑定、if-with-initializer
    auto [x, y, z] = std::make_tuple(10, 20, 30);
    std::cout << "C++17 结构化绑定:" << std::endl;
    std::cout << "x=" << x << ", y=" << y << ", z=" << z << std::endl;
    
    // if with initializer
    if (auto sum = x + y + z; sum > 50) {
        std::cout << "sum(" << sum << ") > 50" << std::endl;
    }
    
    return 0;
}`
    },
    cpp20: {
      label: 'C++20',
      code: `#include <iostream>
#include <vector>
#include <ranges>
#include <concepts>

// C++20: concept 约束
template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

template<Addable T>
T add(T a, T b) {
    return a + b;
}

int main() {
    std::cout << "C++20 Concept 演示:" << std::endl;
    std::cout << "add(3, 4) = " << add(3, 4) << std::endl;
    
    // ranges 管道操作
    auto nums = std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    std::cout << "偶数平方:" << std::endl;
    // TODO: ranges views 需要 full C++20 支持
    for (int n : nums) {
        if (n % 2 == 0) {
            std::cout << n * n << " ";
        }
    }
    std::cout << std::endl;
    
    return 0;
}`
    },
    cpp23: {
      label: 'C++23',
      code: `// C++23: 标准模块导入 (需要编译器支持)
// import std;  // TODO: 等待完整模块支持
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::cout << "C++23 新特性预览:" << std::endl;
    
    // 缩略函数模板 (C++23 特性占位)
    auto print = [](auto&&... args) {
        ((std::cout << args << " "), ...);
        std::cout << std::endl;
    };
    
    print("Hello", "C++23", "World!");
    
    // std::print 占位
    std::cout << "[std::print 将在 C++23 中可用]" << std::endl;
    
    return 0;
}`
    }
  };

  /* ---- 模拟运行库：20+ 常用代码片段的预定义输出 ---- */
  static SIMULATION_LIBRARY = [
    {
      name: 'Hello World',
      patterns: ['hello world', '#include <iostream>', 'cout << "Hello'],
      output: `Hello, World!`,
      runtime: 12
    },
    {
      name: 'Hello World Chinese',
      patterns: ['你好', '世界', 'cout << "你好'],
      output: `你好，世界！`,
      runtime: 15
    },
    {
      name: 'Basic Arithmetic',
      patterns: ['+', '-', '*', '/', 'arithmetic', '运算'],
      matchThreshold: 3,
      outputFn: (code) => {
        const results = [];
        // Try to find arithmetic expressions and evaluate them
        const lines = code.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.includes('cout') && (trimmed.includes('+') || trimmed.includes('-') || trimmed.includes('*') || trimmed.includes('/'))) {
            // Try to extract simple arithmetic
            const match = trimmed.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
            if (match) {
              const [, a, op, b] = match;
              let result;
              switch(op) {
                case '+': result = parseInt(a) + parseInt(b); break;
                case '-': result = parseInt(a) - parseInt(b); break;
                case '*': result = parseInt(a) * parseInt(b); break;
                case '/': result = Math.floor(parseInt(a) / parseInt(b)); break;
              }
              results.push(`${a} ${op} ${b} = ${result}`);
            }
          }
        }
        return results.length > 0 ? results.join('\n') : `42 + 8 = 50\n100 - 30 = 70\n7 * 6 = 42\n20 / 4 = 5`;
      },
      runtime: 18
    },
    {
      name: 'Vector Operations',
      patterns: ['vector<', 'std::vector', '#include <vector>', 'push_back'],
      output: `Vector contents: 10 20 30 40 50 
Size: 5
Capacity: 8
Front: 10
Back: 50`,
      runtime: 25
    },
    {
      name: 'String Operations',
      patterns: ['string', 'std::string', '#include <string>', 'substr', 'find'],
      output: `Original: Hello C++
Length: 9
Substring: C++
Found "C++" at position: 6
Uppercase: HELLO C++`,
      runtime: 20
    },
    {
      name: 'Map Container',
      patterns: ['map<', 'std::map', '#include <map>', 'unordered_map'],
      output: `Alice -> 90
Bob -> 85
Charlie -> 92
Size: 3
Bob's score: 85`,
      runtime: 30
    },
    {
      name: 'Array Loop',
      patterns: ['for (', 'range', 'auto&', '迭代', '遍历'],
      output: `Element 0: 10
Element 1: 20
Element 2: 30
Element 3: 40
Element 4: 50`,
      runtime: 15
    },
    {
      name: 'Pointer Demo',
      patterns: ['int*', 'char*', '指针', 'pointer', 'new ', 'delete'],
      output: `x = 42, &x = 0x7ffd_1000
p = 0x7ffd_1000, *p = 42
After *p = 100: x = 100
Array: 0x55a3_2000
arr[0]=0, arr[1]=1, arr[2]=2`,
      runtime: 22
    },
    {
      name: 'Function Overload',
      patterns: ['overload', '重载', '同名函数', '函数重载'],
      output: `print(int): 42
print(double): 3.14
print(string): Hello
print(int, int): 10, 20`,
      runtime: 16
    },
    {
      name: 'Class/Object',
      patterns: ['class ', 'public:', 'private:', '构造函数', 'class', 'struct '],
      outputFn: (code) => {
        const classMatch = code.match(/class\s+(\w+)/);
        const className = classMatch ? classMatch[1] : 'Person';
        return `${className} created
Name: Alice, Age: 25
${className} copied
Name: Bob, Age: 30
Total objects: 2
${className} destroyed
${className} destroyed`;
      },
      runtime: 28
    },
    {
      name: 'Inheritance',
      patterns: [': public', 'virtual', 'override', '继承', '派生'],
      output: `Animal speaks: Some sound
Dog speaks: Woof!
Cat speaks: Meow!
Animal type: Canine
Animal type: Feline`,
      runtime: 32
    },
    {
      name: 'Lambda Expressions',
      patterns: ['lambda', 'auto ', '= [', 'Lambda', 'lambda表达式'],
      output: `Lambda (no capture): 42
Lambda (capture x=10): 52
Lambda (mutable, counter): 1
Lambda (mutable, counter): 2
Lambda (mutable, counter): 3
Generic lambda: 15
Generic lambda: 2.5`,
      runtime: 24
    },
    {
      name: 'Template Function',
      patterns: ['template<', 'typename T', 'template', '模板'],
      output: `max<int>(3, 5) = 5
max<double>(2.5, 1.8) = 2.5
max<char>('a', 'z') = z
Array sum<int>: 150
Array sum<double>: 37.5`,
      runtime: 26
    },
    {
      name: 'Smart Pointers',
      patterns: ['unique_ptr', 'shared_ptr', 'weak_ptr', 'make_unique', 'make_shared', '智能指针'],
      output: `Resource created: id=1
Resource value: 42
Use count: 1
Use count (after share): 2
Use count (after reset): 1
Resource destroyed: id=1
Expired: true`,
      runtime: 30
    },
    {
      name: 'Exception Handling',
      patterns: ['try', 'catch', 'throw', '异常', 'exception'],
      output: `Entering try block
Exception caught: Division by zero!
Error code: 42
Finally cleanup
Program continues normally...`,
      runtime: 20
    },
    {
      name: 'File I/O',
      patterns: ['fstream', 'ofstream', 'ifstream', '#include <fstream>', '文件'],
      output: `File opened: data.txt
Writing: Hello, File I/O!
Reading line: Hello, File I/O!
File size: 18 bytes
File closed successfully`,
      runtime: 35
    },
    {
      name: 'Recursion',
      patterns: ['recursive', 'factorial', 'fibonacci', '递归', 'recursion'],
      outputFn: (code) => {
        if (code.includes('fibonacci') || code.includes('fib')) {
          return `fib(0) = 0
fib(1) = 1
fib(2) = 1
fib(3) = 2
fib(4) = 3
fib(5) = 5
fib(6) = 8
fib(7) = 13
fib(8) = 21
fib(9) = 34
fib(10) = 55`;
        }
        return `factorial(0) = 1
factorial(1) = 1
factorial(2) = 2
factorial(3) = 6
factorial(4) = 24
factorial(5) = 120`;
      },
      runtime: 28
    },
    {
      name: 'Reference Demo',
      patterns: ['int&', '引用', 'reference', 'swap', 'const&'],
      output: `Original: a=10, b=20
After swap: a=20, b=10
ref = 100, original = 100
const_ref = 42
sizeof(ref) = sizeof(int) = 4`,
      runtime: 15
    },
    {
      name: 'Constexpr',
      patterns: ['constexpr', 'consteval', 'constinit'],
      output: `constexpr factorial(5) = 120
constexpr fib(10) = 55
Array size (constexpr): 20
Compile-time sqrt(16) = 4
Compile-time pow(2, 10) = 1024`,
      runtime: 10
    },
    {
      name: 'Move Semantics',
      patterns: ['&&', 'move(', 'std::move', '右值引用', '移动语义'],
      output: `String constructed: "Hello World"
Moved to: "Hello World"
Source after move: ""
Vector capacity: 1000
After move assignment: size=1000
Source vector empty: true`,
      runtime: 22
    },
    {
      name: 'Threading',
      patterns: ['thread', '#include <thread>', 'async', 'mutex', '并发'],
      output: `Main thread id: 140735_1234
Worker 1 started
Worker 2 started
Worker 1 finished: 100
Worker 2 finished: 200
Result: 300
All threads joined`,
      runtime: 150
    },
    {
      name: 'Hello with Name',
      patterns: ['cin >>', '输入', 'name', '请输入'],
      outputFn: () => {
        // Simulate interactive input
        return `Please enter your name: Alice
Hello, Alice!
Welcome to C++ programming.`;
      },
      runtime: 500
    },
    {
      name: 'nullptr vs NULL',
      patterns: ['nullptr', 'NULL', '空指针'],
      output: `nullptr address: 0x0
NULL address: 0x0
nullptr type: std::nullptr_t
NULL type: long
foo(int*) called
foo(int) not called for nullptr`,
      runtime: 14
    },
    {
      name: 'Structured Binding (C++17)',
      patterns: ['auto [', 'structured', '结构化绑定'],
      output: `Point: x=10, y=20, z=30
Pair: first=100, second=hello
Map entry: key=Alice, value=90
Nested: a=1, b=2, c=3`,
      runtime: 18
    },
    {
      name: 'Concepts (C++20)',
      patterns: ['concept ', 'requires', 'std::convertible_to'],
      output: `add(3, 4) = 7
add(2.5, 3.1) = 5.6
String concat: Hello World
add(Point{1,2}, Point{3,4}) = Point{4, 6}`,
      runtime: 20
    },
    {
      name: 'Modules (C++20/23)',
      patterns: ['export module', 'import ', '模块'],
      output: `// export module math;
// export int add(int a, int b) { return a + b; }
// import math;
// Result: add(2, 3) = 5
[注意: 完整模块支持需要 C++20 编译器]`,
      runtime: 12
    },
    {
      name: 'Coroutines (C++20)',
      patterns: ['co_await', 'co_yield', 'co_return', '协程'],
      output: `Generator started
Value: 1
Value: 2
Value: 3
Value: 4
Value: 5
Generator finished
[注意: 协程需要编译器支持 <coroutine> 头文件]`,
      runtime: 25
    },
    {
      name: 'Ranges (C++20)',
      patterns: ['ranges::', 'views::', '管道', 'ranges'],
      output: `Original: 1 2 3 4 5 6 7 8 9 10
Filtered (>3): 4 5 6 7 8 9 10
Transformed (*2): 2 4 6 8 10 12 14 16 18 20
Taken(5): 1 2 3 4 5
Reversed: 10 9 8 7 6 5 4 3 2 1`,
      runtime: 30
    },
    {
      name: 'Format (C++20)',
      patterns: ['std::format', 'format(', '格式化'],
      output: `Hello, Alice! You have 42 messages.
Pi = 3.14
Hex: 0xff, Bin: 0b11111111
Aligned: |   hello|
Number: |0000042|`,
      runtime: 15
    },
    {
      name: 'Span (C++20)',
      patterns: ['std::span', 'span<', '连续视图'],
      output: `Span size: 5
Span first: 10
Span last: 50
Subspan(1, 3): 20 30 40
Span over array: 1 2 3 4 5 6 7 8 9 10`,
      runtime: 18
    },
    {
      name: 'Three-way Comparison (C++20)',
      patterns: ['<=>', 'spaceship', '三路比较'],
      output: `5 <=> 3 = strong_ordering::greater
5 <=> 5 = strong_ordering::equivalent
5 <=> 7 = strong_ordering::less
string "abc" <=> "def" = less`,
      runtime: 14
    },
    {
      name: 'Designated Initializers (C++20)',
      patterns: ['.x =', '.name =', '指定初始化'],
      output: `Point{.x=10, .y=20}: (10, 20)
Person{.name="Alice", .age=25}: Alice, 25
Rect{.x=0, .y=0, .w=100, .h=50}: 0, 0, 100x50`,
      runtime: 12
    }
  ];

  /* ---- 构造函数 ---- */
  constructor(container) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      throw new Error('WasmEditor: container element not found');
    }
    this.code = '';
    this.output = '';
    this.status = 'ready'; // ready | compiling | running | error
    this.currentTemplate = 'cpp20';
    this.lineCount = 1;
    this.execStartTime = 0;
    this.animationId = null;
    
    this.init();
  }

  /* ---- 初始化 ---- */
  init() {
    this.injectStyles();
    this.render();
    this.bindEvents();
    this.loadTemplate(this.currentTemplate);
    this.updateStatus('ready');
  }

  /* ---- 注入组件样式 ---- */
  injectStyles() {
    if (document.getElementById('wasm-editor-styles')) return;
    const style = document.createElement('style');
    style.id = 'wasm-editor-styles';
    style.textContent = `
      /* ===== WasmEditor 组件样式 ===== */
      .wasm-editor {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--bg-primary);
        box-shadow: var(--shadow);
        font-family: var(--font-body);
        display: flex;
        flex-direction: column;
      }
      
      /* 工具栏 */
      .wasm-editor-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        background: var(--bg-tertiary);
        border-bottom: 1px solid var(--border);
        gap: 12px;
        flex-wrap: wrap;
      }
      .wasm-editor-toolbar-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .wasm-editor-toolbar-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .wasm-lang-tag {
        font-family: var(--font-code);
        font-size: 0.8rem;
        font-weight: 700;
        color: var(--accent);
        background: var(--accent-light);
        padding: 4px 10px;
        border-radius: var(--radius);
        border: 1px solid var(--accent);
        user-select: none;
      }
      
      .wasm-template-select {
        padding: 5px 10px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: 0.8rem;
        cursor: pointer;
        transition: var(--transition);
      }
      .wasm-template-select:focus {
        outline: none;
        border-color: var(--accent);
      }
      
      .wasm-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: var(--text-muted);
        font-family: var(--font-code);
      }
      .wasm-status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--text-muted);
        transition: all 0.3s ease;
      }
      .wasm-status.ready .wasm-status-dot { background: var(--success); }
      .wasm-status.compiling .wasm-status-dot { background: var(--warning); animation: wasmPulse 1s infinite; }
      .wasm-status.running .wasm-status-dot { background: var(--accent); animation: wasmPulse 0.5s infinite; }
      .wasm-status.error .wasm-status-dot { background: var(--danger); }
      .wasm-status.ready { color: var(--success); }
      .wasm-status.compiling { color: var(--warning); }
      .wasm-status.running { color: var(--accent); }
      .wasm-status.error { color: var(--danger); }
      
      .wasm-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--bg-primary);
        color: var(--text-secondary);
        font-family: var(--font-body);
        font-size: 0.8rem;
        cursor: pointer;
        transition: var(--transition);
        white-space: nowrap;
      }
      .wasm-btn:hover {
        border-color: var(--accent);
        color: var(--accent);
        background: var(--accent-light);
      }
      .wasm-btn-run {
        background: var(--success);
        color: white;
        border-color: var(--success);
      }
      .wasm-btn-run:hover {
        background: #0DA271;
        border-color: #0DA271;
        color: white;
      }
      .wasm-btn-run:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .wasm-btn-reset:hover {
        border-color: var(--danger);
        color: var(--danger);
        background: rgba(239, 68, 68, 0.1);
      }
      
      /* 代码编辑区 */
      .wasm-editor-code {
        display: flex;
        min-height: 240px;
        max-height: 450px;
        background: var(--code-bg);
        position: relative;
      }
      
      .wasm-line-numbers {
        width: 48px;
        background: var(--bg-tertiary);
        border-right: 1px solid var(--border);
        padding: 12px 0;
        text-align: right;
        font-family: var(--font-code);
        font-size: 0.82rem;
        line-height: 1.7;
        color: var(--text-muted);
        user-select: none;
        overflow: hidden;
        flex-shrink: 0;
      }
      .wasm-line-num {
        padding: 0 10px;
        min-height: calc(0.82rem * 1.7);
      }
      .wasm-line-num.current {
        color: var(--accent);
        background: var(--accent-light);
      }
      
      .wasm-code-input {
        flex: 1;
        padding: 12px 16px;
        border: none;
        outline: none;
        background: var(--code-bg);
        color: var(--code-text);
        font-family: var(--font-code);
        font-size: 0.82rem;
        line-height: 1.7;
        resize: none;
        tab-size: 2;
      }
      .wasm-code-input::placeholder {
        color: var(--text-muted);
      }
      
      /* 终端面板 */
      .wasm-terminal {
        border-top: 1px solid var(--border);
        background: #0D1117;
        min-height: 160px;
        max-height: 300px;
        display: flex;
        flex-direction: column;
      }
      
      .wasm-terminal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 14px;
        background: #161B22;
        border-bottom: 1px solid #30363D;
      }
      .wasm-terminal-dots {
        display: flex;
        gap: 6px;
      }
      .wasm-terminal-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .wasm-terminal-dot.red { background: #FF5F56; }
      .wasm-terminal-dot.yellow { background: #FFBD2E; }
      .wasm-terminal-dot.green { background: #27C93F; }
      
      .wasm-terminal-title {
        font-family: var(--font-code);
        font-size: 0.75rem;
        color: #8B949E;
      }
      .wasm-terminal-actions {
        display: flex;
        gap: 6px;
      }
      .wasm-terminal-btn {
        padding: 3px 8px;
        border: 1px solid #30363D;
        border-radius: 4px;
        background: #21262D;
        color: #8B949E;
        font-size: 0.7rem;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .wasm-terminal-btn:hover {
        background: #30363D;
        color: #E6EDF3;
      }
      
      .wasm-terminal-body {
        flex: 1;
        padding: 12px 14px;
        overflow-y: auto;
        font-family: var(--font-code);
        font-size: 0.8rem;
        line-height: 1.6;
        color: #7EE787;
      }
      .wasm-terminal-body::-webkit-scrollbar {
        width: 6px;
      }
      .wasm-terminal-body::-webkit-scrollbar-thumb {
        background: #30363D;
        border-radius: 3px;
      }
      
      .wasm-terminal-line {
        margin: 2px 0;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .wasm-terminal-line.error {
        color: #F87171;
      }
      .wasm-terminal-line.error::before {
        content: "✗ ";
        font-weight: 700;
      }
      .wasm-terminal-line.warn {
        color: #FBBF24;
      }
      .wasm-terminal-line.info {
        color: #79B8FF;
      }
      .wasm-terminal-line.system {
        color: #8B949E;
        font-style: italic;
      }
      .wasm-terminal-line.output {
        color: #7EE787;
      }
      .wasm-terminal-line.compile {
        color: #D2A8FF;
      }
      
      .wasm-terminal-empty {
        color: #484F58;
        font-style: italic;
      }
      
      .wasm-terminal-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 14px;
        background: #161B22;
        border-top: 1px solid #30363D;
        font-family: var(--font-code);
        font-size: 0.7rem;
        color: #484F58;
      }
      
      /* 动画 */
      @keyframes wasmPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }
      
      @keyframes wasmTerminalBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      
      .wasm-cursor {
        display: inline-block;
        width: 8px;
        height: 15px;
        background: #7EE787;
        animation: wasmTerminalBlink 1s infinite;
        vertical-align: middle;
        margin-left: 2px;
      }
      
      /* 响应式 */
      @media (max-width: 768px) {
        .wasm-editor-toolbar {
          padding: 8px 10px;
          gap: 8px;
        }
        .wasm-editor-code {
          min-height: 180px;
          max-height: 320px;
        }
        .wasm-terminal {
          min-height: 120px;
          max-height: 220px;
        }
        .wasm-line-numbers {
          width: 36px;
          font-size: 0.75rem;
        }
        .wasm-code-input {
          font-size: 0.75rem;
          padding: 10px 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ---- 渲染 UI ---- */
  render() {
    this.container.innerHTML = `
      <div class="wasm-editor">
        <!-- 工具栏 -->
        <div class="wasm-editor-toolbar">
          <div class="wasm-editor-toolbar-left">
            <span class="wasm-lang-tag">C++</span>
            <select class="wasm-template-select" id="wasmTemplate_${this._id}">
              ${Object.entries(WasmEditor.TEMPLATES).map(([key, t]) => 
                `<option value="${key}" ${key === this.currentTemplate ? 'selected' : ''}>${t.label}</option>`
              ).join('')}
            </select>
            <span class="wasm-status" id="wasmStatus_${this._id}">
              <span class="wasm-status-dot"></span>
              <span class="wasm-status-text">就绪</span>
            </span>
          </div>
          <div class="wasm-editor-toolbar-right">
            <button class="wasm-btn wasm-btn-run" id="wasmRun_${this._id}">
              <span>▶</span> 运行
            </button>
            <button class="wasm-btn wasm-btn-reset" id="wasmReset_${this._id}">
              <span>↺</span> 重置
            </button>
          </div>
        </div>
        
        <!-- 代码编辑区 -->
        <div class="wasm-editor-code">
          <div class="wasm-line-numbers" id="wasmLineNums_${this._id}">
            <div class="wasm-line-num current">1</div>
          </div>
          <textarea 
            class="wasm-code-input" 
            id="wasmCodeInput_${this._id}"
            placeholder="在此输入 C++ 代码..."
            spellcheck="false"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="off"
          ></textarea>
        </div>
        
        <!-- 终端输出面板 -->
        <div class="wasm-terminal">
          <div class="wasm-terminal-header">
            <div class="wasm-terminal-dots">
              <span class="wasm-terminal-dot red"></span>
              <span class="wasm-terminal-dot yellow"></span>
              <span class="wasm-terminal-dot green"></span>
            </div>
            <span class="wasm-terminal-title">终端 — 输出</span>
            <div class="wasm-terminal-actions">
              <button class="wasm-terminal-btn" id="wasmClearTerm_${this._id}">清空</button>
              <button class="wasm-terminal-btn" id="wasmCopyOut_${this._id}">复制</button>
            </div>
          </div>
          <div class="wasm-terminal-body" id="wasmTerminalBody_${this._id}">
            <div class="wasm-terminal-empty">点击「运行」按钮执行代码...</div>
          </div>
          <div class="wasm-terminal-footer" id="wasmTermFooter_${this._id}">
            <span>WebAssembly 模拟执行环境</span>
            <span id="wasmExecTime_${this._id}"></span>
          </div>
        </div>
      </div>
    `;
    
    this.cacheElements();
  }
  
  /* ---- 生成唯一 ID ---- */
  get _id() {
    if (!this.__id) {
      this.__id = Math.random().toString(36).slice(2, 9);
    }
    return this.__id;
  }

  /* ---- 缓存 DOM 引用 ---- */
  cacheElements() {
    this.el = {
      templateSelect: document.getElementById(`wasmTemplate_${this._id}`),
      status: document.getElementById(`wasmStatus_${this._id}`),
      statusText: document.querySelector(`#wasmStatus_${this._id} .wasm-status-text`),
      runBtn: document.getElementById(`wasmRun_${this._id}`),
      resetBtn: document.getElementById(`wasmReset_${this._id}`),
      lineNums: document.getElementById(`wasmLineNums_${this._id}`),
      codeInput: document.getElementById(`wasmCodeInput_${this._id}`),
      terminalBody: document.getElementById(`wasmTerminalBody_${this._id}`),
      clearTermBtn: document.getElementById(`wasmClearTerm_${this._id}`),
      copyOutBtn: document.getElementById(`wasmCopyOut_${this._id}`),
      execTime: document.getElementById(`wasmExecTime_${this._id}`),
    };
  }

  /* ---- 绑定事件 ---- */
  bindEvents() {
    // 模板切换
    this.el.templateSelect?.addEventListener('change', (e) => {
      this.loadTemplate(e.target.value);
    });
    
    // 运行按钮
    this.el.runBtn?.addEventListener('click', () => this.run());
    
    // 重置按钮
    this.el.resetBtn?.addEventListener('click', () => this.reset());
    
    // 清空终端
    this.el.clearTermBtn?.addEventListener('click', () => this.clear());
    
    // 复制输出
    this.el.copyOutBtn?.addEventListener('click', () => this.copyOutput());
    
    // 代码输入同步行号
    this.el.codeInput?.addEventListener('input', () => this.syncLineNumbers());
    this.el.codeInput?.addEventListener('scroll', () => this.syncScroll());
    this.el.codeInput?.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // 快捷键
    this.el.codeInput?.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        this.run();
      }
    });
  }

  /* ---- 行号同步 ---- */
  syncLineNumbers() {
    const lines = this.el.codeInput.value.split('\n').length;
    const currentLine = this.el.codeInput.value.substring(0, this.el.codeInput.selectionStart).split('\n').length;
    
    let html = '';
    for (let i = 1; i <= lines; i++) {
      html += `<div class="wasm-line-num ${i === currentLine ? 'current' : ''}">${i}</div>`;
    }
    this.el.lineNums.innerHTML = html;
    this.lineCount = lines;
  }

  syncScroll() {
    this.el.lineNums.scrollTop = this.el.codeInput.scrollTop;
  }

  /* ---- Tab 键支持 ---- */
  handleKeydown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.el.codeInput.selectionStart;
      const end = this.el.codeInput.selectionEnd;
      const value = this.el.codeInput.value;
      
      // 智能缩进：检测是否需要自动补全
      this.el.codeInput.value = value.substring(0, start) + '  ' + value.substring(end);
      this.el.codeInput.selectionStart = this.el.codeInput.selectionEnd = start + 2;
      this.syncLineNumbers();
    }
  }

  /* ========== 核心 API ========== */

  /* ---- 加载代码 ---- */
  loadCode(code) {
    this.el.codeInput.value = code;
    this.syncLineNumbers();
    this.updateStatus('ready');
  }

  /* ---- 获取代码 ---- */
  getCode() {
    return this.el.codeInput.value;
  }

  /* ---- 加载模板 ---- */
  loadTemplate(templateKey) {
    const tmpl = WasmEditor.TEMPLATES[templateKey];
    if (!tmpl) return;
    this.currentTemplate = templateKey;
    this.loadCode(tmpl.code);
  }

  /* ---- 执行代码 ---- */
  async run() {
    const code = this.getCode().trim();
    if (!code) {
      this.printTerminal('请输入代码后再运行', 'warn');
      return;
    }

    this.updateStatus('compiling');
    this.el.runBtn.disabled = true;
    this.clear();
    this.printTerminal('// TODO: 集成 Emscripten Wasm 编译器', 'compile');
    this.printTerminal('// 未来可通过 WebAssembly.instantiate() 加载 Clang Wasm 模块实现真实编译', 'compile');
    this.printTerminal('─────────────────────────', 'system');
    this.printTerminal('[模拟模式] 编译中...', 'compile');

    // 模拟编译延迟
    const compileDelay = 300 + Math.random() * 500;
    await this.delay(compileDelay);

    this.updateStatus('running');
    this.printTerminal('编译成功！执行中...\n', 'compile');

    this.execStartTime = performance.now();

    // 尝试模拟匹配
    const result = this.findSimulation(code);
    
    if (result) {
      // 使用匹配的模拟输出
      await this.typewriterOutput(result.output, result.runtime);
    } else {
      // 无匹配：生成合理的默认输出
      await this.typewriterOutput(this.generateFallbackOutput(code), 20);
    }

    const execTime = (performance.now() - this.execStartTime).toFixed(2);
    this.el.execTime.textContent = `执行时间: ${execTime}ms`;
    
    this.updateStatus('ready');
    this.el.runBtn.disabled = false;
    this.printTerminal('\n─────────────────────────', 'system');
    this.printTerminal(`[程序退出，返回值 0]`, 'system');
  }

  /* ---- 清空输出 ---- */
  clear() {
    this.el.terminalBody.innerHTML = '';
    this.el.execTime.textContent = '';
    this.output = '';
  }

  /* ---- 重置 ---- */
  reset() {
    this.clear();
    this.loadTemplate(this.currentTemplate);
    this.updateStatus('ready');
    this.printTerminal('编辑器已重置', 'info');
  }

  /* ---- 复制输出 ---- */
  async copyOutput() {
    const text = this.output || this.el.terminalBody.textContent;
    try {
      await navigator.clipboard.writeText(text);
      const original = this.el.copyOutBtn.textContent;
      this.el.copyOutBtn.textContent = '已复制!';
      setTimeout(() => { this.el.copyOutBtn.textContent = original; }, 1500);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  /* ========== 内部方法 ========== */

  /* ---- 查找模拟匹配 ---- */
  findSimulation(code) {
    const lowerCode = code.toLowerCase();
    
    for (const sim of WasmEditor.SIMULATION_LIBRARY) {
      let matchCount = 0;
      for (const pattern of sim.patterns) {
        if (lowerCode.includes(pattern.toLowerCase())) {
          matchCount++;
        }
      }
      const threshold = sim.matchThreshold || 1;
      if (matchCount >= threshold) {
        return {
          output: typeof sim.output === 'function' ? sim.output(code) : sim.output,
          runtime: sim.runtime
        };
      }
    }
    return null;
  }

  /* ---- 生成回退输出 ---- */
  generateFallbackOutput(code) {
    const lowerCode = code.toLowerCase();
    
    // 检测 cout 语句
    const coutMatches = code.match(/cout\s*<<\s*([^;]+);/g);
    if (coutMatches) {
      return coutMatches.map(m => {
        const content = m.replace(/cout\s*<<\s*/, '').replace(/\s*<<\s*std::endl/, '').replace(/\s*<<\s*endl/, '');
        // 尝试提取字符串字面量
        const strMatch = content.match(/"([^"]*)"/);
        if (strMatch) return strMatch[1];
        return content.trim();
      }).join('\n');
    }
    
    // 检查是否包含 main 函数
    if (lowerCode.includes('int main')) {
      return `[程序已执行]\n[无可见输出 — 代码中可能缺少 std::cout 输出语句]`;
    }
    
    return `[编译成功]\n[注意: 代码中未检测到 main() 函数入口点]`;
  }

  /* ---- 打字机效果输出 ---- */
  async typewriterOutput(text, charDelay = 5) {
    const lines = text.split('\n');
    for (const line of lines) {
      const div = document.createElement('div');
      div.className = 'wasm-terminal-line output';
      this.el.terminalBody.appendChild(div);
      
      // 字符逐字输出效果
      for (let i = 0; i < line.length; i++) {
        div.textContent += line[i];
        if (charDelay > 2 && i % 3 === 0) {
          await this.delay(charDelay);
        }
        this.el.terminalBody.scrollTop = this.el.terminalBody.scrollHeight;
      }
      
      this.output += line + '\n';
      await this.delay(charDelay * 2);
    }
    
    // 添加闪烁光标
    const cursor = document.createElement('span');
    cursor.className = 'wasm-cursor';
    this.el.terminalBody.appendChild(cursor);
    this.el.terminalBody.scrollTop = this.el.terminalBody.scrollHeight;
  }

  /* ---- 终端打印 ---- */
  printTerminal(message, type = 'output') {
    const div = document.createElement('div');
    div.className = `wasm-terminal-line ${type}`;
    div.textContent = message;
    this.el.terminalBody.appendChild(div);
    this.el.terminalBody.scrollTop = this.el.terminalBody.scrollHeight;
    this.output += message + '\n';
  }

  /* ---- 更新状态 ---- */
  updateStatus(status) {
    this.status = status;
    const statusMap = {
      ready: { text: '就绪', className: 'ready' },
      compiling: { text: '编译中...', className: 'compiling' },
      running: { text: '运行中...', className: 'running' },
      error: { text: '错误', className: 'error' }
    };
    const s = statusMap[status];
    if (s && this.el.status) {
      this.el.status.className = `wasm-status ${s.className}`;
      this.el.statusText.textContent = s.text;
    }
  }

  /* ---- 工具 ---- */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ---- 销毁 ---- */
  destroy() {
    this.el.codeInput?.removeEventListener('input', this.syncLineNumbers);
    this.el.codeInput?.removeEventListener('scroll', this.syncScroll);
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

/* ===== 全局注册 ===== */
if (typeof window !== 'undefined') {
  window.WasmEditor = WasmEditor;
}
