// 感谢  众诚科技  大佬


1  js 转class
org.mozilla.javascript.tools.jsc.Main.main(["/sdcard/脚本/test1.js"])

2  class转dex

 dx --dex --output =E:\test\test1.dex  test1.class

3  执行加密脚本
var path = "/storage/emulated/0/tencent/QQfile_recv/test1.dex" 

runtime.loadDex(path) 
/*
importClass("test1"); 

new test1.main([]) 

*/

 new Packages["test1"]()()