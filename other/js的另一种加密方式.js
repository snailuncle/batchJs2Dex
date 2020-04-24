
// ProjectXero 提供的另一种加密方式
// 只能适用于同版本aj

function compile(opt) {
	var cx = org.mozilla.javascript.Context.getCurrentContext();
	cx.setOptimizationLevel(-1);
	var code = org.mozilla.javascript.Kit.readReader(new java.io.FileReader(opt.src));
	var script = cx.compileString(code, "ScriptName", 0, null);
	var bos = new java.io.ByteArrayOutputStream();
	var oos = new java.io.ObjectOutputStream(new java.util.zip.DeflaterOutputStream(bos, new java.util.zip.Deflater(9, true)));
	oos.writeObject(script);
	oos.close();
	var fos = new java.io.FileOutputStream(opt.target);
	fos.write(new java.lang.String([
		code.startsWith("\"ui\";") ? "\"ui\";" : "",
		"new java.io.ObjectInputStream(new java.util.zip.InflaterInputStream(new java.io.ByteArrayInputStream(android.util.Base64.decode(\"",
		android.util.Base64.encodeToString(bos.toByteArray(), 2),
		"\",2)),new java.util.zip.Inflater(true))).readObject()()"
	].join("")).getBytes());
}
// compile函数为压缩编译脚本函数 请自行修改这里的参数
compile({
	// 源代码文件
	src : "/storage/emulated/0/脚本/RhinoScript/test.js",

	// 目标代码文件，仅能在生成目标代码的app版本上运行
	target : "/storage/emulated/0/脚本/RhinoScript/test.out.js"
});