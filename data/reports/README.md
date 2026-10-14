# 真实雷达 JSON 放置处

将 `new-term-radar` 日产出放到本目录，文件名建议：

```text
YYYY-MM-DD.json
```

结构需符合同级目录旁的 `../radar.schema.json`，或与 `src/data/sample-report.ts` 中 `SAMPLE_REPORT` 对齐。

当前 Demo **不读取**本目录；接入方式见根 README「接入真实雷达 JSON」。
