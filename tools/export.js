const fs=require('fs'),vm=require('vm');const ctx={};ctx.window=ctx;vm.createContext(ctx);
process.argv.slice(2).forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx));const ST=ctx.STORY,sc=ST.scenes;
const lbl={TT:'Tỉnh táo',TC:'Tin cậy',DN:'Độ neo',PIN:'Pin'};
const fx=e=>e?Object.entries(e).map(([k,v])=>`${lbl[k]} ${v>0?'+':''}${v}`).join(' · '):'';
const S0={TT:70,TC:50,DN:0,PIN:6,flags:{}};
let md='';
for(const [id,s] of Object.entries(sc)){
  if(s.type==='actend')continue;
  md+=`\n### ${s.type==='ending'?'💀 KẾT THÚC: ':''}${s.title}${s.time?` · ${s.time}`:''}\n<sub>\`${id}\`</sub>\n\n`;
  let t=typeof s.text==='function'?s.text({...S0,flags:{phat_neo_nang:true,l7_cua_phat:true,tho_da_nhan_loi:true,tho_live:true,goi_me:true,co_bien_ban:true,ke_me:true,ghi_su_that:true}}):s.text;
  if(typeof s.text==='function')md+='*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*\n\n';
  t.forEach(p=>md+=`${p}\n\n`);
  if(s.effects)md+=`**Chỉ số:** ${fx(s.effects)}\n\n`;
  if(s.gain&&s.gain.rules)md+=`**Nhận luật:** ${s.gain.rules.join(', ')}\n\n`;
  if(s.gain&&s.gain.clues)md+=`**Manh mối:** ${s.gain.clues.join(' / ')}\n\n`;
  if(s.timer)md+=`**Đồng hồ:** ${s.timer.sec} giây (${s.timer.label}). Hết giờ → \`${s.timer.next}\`\n\n`;
  if(s.flags)md+=`**Cờ:** ${Object.keys(s.flags).join(', ')}\n\n`;
  if(s.inspect){md+='**Ký hiệu trên bản vẽ:**\n\n';for(const [k,v] of Object.entries(s.inspect))md+=`- ${v}\n`;md+='\n'}
  const opts=s.choices||s.answers||[];
  if(opts.length>1||s.answers){md+='**Lựa chọn:**\n\n';opts.forEach(c=>{const n=typeof c.next==='function'?'`'+c.next({TC:100,flags:{}})+'` (Tin cậy ≥ 60) / `'+c.next({TC:0,flags:{}})+'`':'`'+c.next+'`';md+=`- ${c.key?c.key+'. ':''}${c.text} → ${n}\n`});md+='\n'}
  md+='---\n';
}
process.stdout.write(md);
