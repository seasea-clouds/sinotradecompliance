#!/bin/bash
# sinotradecompliance.com 线上验证脚本
# 验收标准：HTTP 200 + 无 __next_error__ + 正确内容

BASE="https://www.sinotradecompliance.com"
PASS=0
FAIL=0
REPORT=""

check() {
  local url="$1"
  local pattern="$2"
  local label="$3"
  local http_code
  http_code=$(curl -sI "$url" 2>&1 | head -1 | grep -oP '\d{3}')

  if [ "$http_code" = "200" ]; then
    local body
    body=$(curl -s "$url" 2>&1)

    if echo "$body" | grep -q '__next_error__'; then
      echo "❌ FAIL [$label] $url - HTTP 200 but has __next_error__"
      FAIL=$((FAIL+1))
      REPORT="${REPORT}\n❌ $label: __next_error__ detected"
    elif echo "$body" | grep -qP "$pattern"; then
      echo "✅ PASS [$label] $url"
      PASS=$((PASS+1))
    else
      echo "❌ FAIL [$label] $url - content mismatch"
      FAIL=$((FAIL+1))
      REPORT="${REPORT}\n❌ $label: content mismatch"
    fi
  else
    echo "❌ FAIL [$label] $url - HTTP $http_code"
    FAIL=$((FAIL+1))
    REPORT="${REPORT}\n❌ $label: HTTP $http_code"
  fi
}

echo "=== sinotradecompliance.com 验证 ==="
echo "时间: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
echo ""

check "${BASE}/zh/" '轻松搞定' '中文'
check "${BASE}/en/" 'Clear China' '英文'
check "${BASE}/ja/" '中国税関' '日文'
check "${BASE}/de/" 'China-Zoll' '德文'
check "${BASE}/fr/" 'dédouanement' '法文'
check "${BASE}/es/" 'Aduanas' '西文'
check "${BASE}/ru/" 'Таможня' '俄文'
check "${BASE}/ar/" 'الجمارك' '阿拉伯文'
check "${BASE}/ko/" '중국 세관' '韩文'
check "${BASE}/pt/" 'Alfândega' '葡文'

echo ""
echo "=== 结果: $PASS 通过 / $FAIL 失败 / 共 $((PASS+FAIL)) ==="

if [ "$FAIL" -gt 0 ]; then
  echo -e "\n失败详情:"
  echo -e "$REPORT"
  echo ""

  # 检查 CF Pages 部署状态
  echo "=== 最新 commit ==="
  cd /root/projects/trade/sinotradecompliance && git log --oneline -2

  # 触发 CF Pages 重新部署
  echo ""
  echo "尝试触发 CF Pages re-deploy..."
  if [ -n "$CF_API_TOKEN" ] && [ -n "$CF_ACCOUNT_ID" ]; then
    echo "通过 API 触发..."
  else
    echo "缺少 CF API 凭据，建议手动去 CF Pages 控制台重新部署"
  fi

  exit 1
else
  echo ""
  echo "🎉 全部通过！网站验收成功！"
  exit 0
fi
