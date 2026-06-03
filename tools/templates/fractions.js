function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function pick(a){return a[rand(0,a.length-1)];}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=rand(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const t=a%b;a=b;b=t;}return a||1;}
function fracStr(n,d){const g=gcd(n,d);return (n/g)+"/"+(d/g);}
function fmt(x){return Number(x.toFixed(6)).toString();}
function parn(x){return x<0?"("+x+")":""+x;}
function snz(min,max){return pick([-1,1])*rand(min,max);}
function withSign(x){return x<0?"− "+Math.abs(x):"+ "+x;}
const SUP={2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸"};
function typed(q,ans,explain,ph){const a=String(ans);const accept=[a];if(a.indexOf("0.")===0)accept.push(a.slice(1));return {type:"typed",q:q,accept:accept,explain:explain,placeholder:ph||"Type a number"};}
function typedFrac(q,raw,simp,explain){const accept=[simp];if(accept.indexOf(raw)===-1)accept.push(raw);return {type:"typed",q:q,accept:accept,explain:explain,placeholder:"Type a fraction (like a/b)"};}
function mcNum(q,answer,distractors,explain){const set=[answer];(distractors||[]).forEach(d=>{if(set.indexOf(d)===-1&&d!==answer)set.push(d);});let g=0;while(set.length<4&&g<200){const c=answer+pick([-10,-5,-3,-2,-1,1,2,3,4,5,10]);if(set.indexOf(c)===-1)set.push(c);g++;}const choices=shuffle(set.slice(0,4)).map(String);return {type:"mc",q:q,choices:choices,answer:choices.indexOf(String(answer)),explain:explain};}
function mcText(q,choices,correct,explain){const sh=shuffle(choices);return {type:"mc",q:q,choices:sh,answer:sh.indexOf(correct),explain:explain};}

const TIERS = [
  [ /* MEDIUM */
    // 1. simplify a fraction
    function(){const g=pick([2,3,4,5,6]);const b=rand(3,9);const a=rand(2,b-1);if(gcd(a,b)!==1)return arguments.callee();const n=a*g,d=b*g;return typedFrac("Simplify the fraction "+n+"/"+d+" to lowest terms.",n+"/"+d,a+"/"+b,n+"/"+d+" — divide top and bottom by the GCF "+g+": "+a+"/"+b+".");},
    // 2. fraction -> decimal (clean)
    function(){const opt=pick([[1,2,"0.5"],[1,4,"0.25"],[3,4,"0.75"],[1,5,"0.2"],[2,5,"0.4"],[3,5,"0.6"],[4,5,"0.8"],[1,8,"0.125"],[3,8,"0.375"],[1,10,"0.1"],[7,10,"0.7"],[1,20,"0.05"]]);return typed("Write "+opt[0]+"/"+opt[1]+" as a decimal.",opt[2],opt[0]+" ÷ "+opt[1]+" = "+opt[2]+".");},
    // 3. decimal -> fraction (simplified)
    function(){const opt=pick([["0.5",1,2],["0.25",1,4],["0.75",3,4],["0.2",1,5],["0.6",3,5],["0.8",4,5],["0.4",2,5],["0.05",1,20],["0.125",1,8],["0.35",7,20],["0.15",3,20]]);return typedFrac("Write the decimal "+opt[0]+" as a fraction in lowest terms.",opt[1]+"/"+opt[2],fracStr(opt[1],opt[2]),opt[0]+" = "+fracStr(opt[1],opt[2])+".");},
    // 4. fraction -> percent (clean)
    function(){const opt=pick([[1,2,50],[1,4,25],[3,4,75],[1,5,20],[2,5,40],[3,5,60],[4,5,80],[1,10,10],[3,10,30],[7,10,70],[1,20,5],[9,10,90]]);return typed("Write "+opt[0]+"/"+opt[1]+" as a percent. (just the number)",opt[2],opt[0]+"/"+opt[1]+" = "+(opt[0]/opt[1])+", and "+(opt[0]/opt[1])+" × 100 = "+opt[2]+"%.");},
    // 5. percent -> decimal
    function(){const p=pick([5,8,12,15,20,25,30,45,60,75,90,4,36]);return typed("Write "+p+"% as a decimal.",fmt(p/100),"Move the decimal two places left: "+p+"% = "+fmt(p/100)+".");},
    // 6. add like denominators
    function(){const d=rand(4,12);const a=rand(1,d-2);const b=rand(1,d-a-1);const n=a+b;return typedFrac("Add: "+a+"/"+d+" + "+b+"/"+d+". Give your answer in lowest terms.",n+"/"+d,fracStr(n,d),"Same denominator: ("+a+"+"+b+")/"+d+" = "+n+"/"+d+" = "+fracStr(n,d)+".");},
    // 7. subtract like denominators
    function(){const d=rand(5,12);const a=rand(3,d-1);const b=rand(1,a-1);const n=a-b;return typedFrac("Subtract: "+a+"/"+d+" − "+b+"/"+d+". Give your answer in lowest terms.",n+"/"+d,fracStr(n,d),"Same denominator: ("+a+"−"+b+")/"+d+" = "+n+"/"+d+" = "+fracStr(n,d)+".");},
    // 8. multiply two simple fractions
    function(){const b=rand(3,6),a=rand(1,b-1),d=rand(3,6),c=rand(1,d-1);const n=a*c,den=b*d;return typedFrac("Multiply: "+a+"/"+b+" × "+c+"/"+d+". Give your answer in lowest terms.",n+"/"+den,fracStr(n,den),"Multiply tops and bottoms: "+n+"/"+den+" = "+fracStr(n,den)+".");},
    // 9. fraction of a quantity (clean)
    function(){const opt=pick([[1,2],[1,3],[1,4],[2,3],[3,4],[1,5],[2,5],[3,5],[1,6],[5,6]]);const k=rand(2,9);const total=opt[1]*k;const ans=opt[0]*k;return typed("What is "+opt[0]+"/"+opt[1]+" of "+total+"?",ans,total+" ÷ "+opt[1]+" = "+k+", then × "+opt[0]+" = "+ans+".");},
    // 10. percent of a quantity (clean)
    function(){const p=pick([10,20,25,50,5,75,40,60,80]);const base=pick([20,40,60,80,100,120,200,160])*1;const ans=p/100*base;if(ans!==Math.round(ans))return arguments.callee();return typed("What is "+p+"% of "+base+"?",ans,p+"% = "+fmt(p/100)+", so "+fmt(p/100)+" × "+base+" = "+ans+".");},
    // 11. compare two fractions (which is greater)
    function(){let a,b,c,d;do{a=rand(1,7);b=rand(2,9);c=rand(1,7);d=rand(2,9);}while(a*d===c*b||a>=b||c>=d);const left=a+"/"+b,right=c+"/"+d;const greater=(a*d>c*b)?left:right;return mcText("Which fraction is greater: "+left+" or "+right+"?",[left,right],greater,"Cross-multiply: "+a+"×"+d+" = "+(a*d)+" vs "+c+"×"+b+" = "+(c*b)+". The larger cross-product marks the larger fraction: "+greater+".");},
    // 12. mixed number -> improper fraction
    function(){const w=rand(1,5),n=rand(1,5),d=rand(n+1,7);const imp=w*d+n;return typedFrac("Write the mixed number "+w+" "+n+"/"+d+" as an improper fraction.",imp+"/"+d,fracStr(imp,d),w+" × "+d+" + "+n+" = "+imp+", over "+d+": "+imp+"/"+d+".");}
  ],
  [ /* HARD */
    // 1. add unlike denominators
    function(){let b,d;do{b=rand(2,8);d=rand(2,8);}while(b===d||gcd(b,d)>1);const a=rand(1,b-1),c=rand(1,d-1);const n=a*d+c*b,den=b*d;return typedFrac("Add: "+a+"/"+b+" + "+c+"/"+d+". Give your answer in lowest terms.",n+"/"+den,fracStr(n,den),"Common denominator "+den+": "+(a*d)+"/"+den+" + "+(c*b)+"/"+den+" = "+n+"/"+den+" = "+fracStr(n,den)+".");},
    // 2. subtract unlike denominators
    function(){let b,d;do{b=rand(2,8);d=rand(2,8);}while(b===d||gcd(b,d)>1);const a=rand(1,b-1),c=rand(1,d-1);let n=a*d-c*b;const den=b*d;if(n<=0)return arguments.callee();return typedFrac("Subtract: "+a+"/"+b+" − "+c+"/"+d+". Give your answer in lowest terms.",n+"/"+den,fracStr(n,den),"Common denominator "+den+": "+(a*d)+"/"+den+" − "+(c*b)+"/"+den+" = "+n+"/"+den+" = "+fracStr(n,den)+".");},
    // 3. divide fractions
    function(){const b=rand(3,7),a=rand(1,b-1),d=rand(3,7),c=rand(1,d-1);const n=a*d,den=b*c;const g=gcd(n,den);const simp=(den/g===1)?String(n/g):fracStr(n,den);return typedFrac("Divide: "+a+"/"+b+" ÷ "+c+"/"+d+". Give your answer in lowest terms.",n+"/"+den,simp,"Multiply by the reciprocal: "+a+"/"+b+" × "+d+"/"+c+" = "+n+"/"+den+" = "+simp+".");},
    // 4. fraction of a fraction
    function(){const b=rand(3,5),a=rand(1,b-1),d=rand(3,5),c=rand(1,d-1);const n=a*c,den=b*d;return typedFrac("What is "+a+"/"+b+" of "+c+"/"+d+"? Give your answer in lowest terms.",n+"/"+den,fracStr(n,den),"\"of\" means multiply: "+a+"/"+b+" × "+c+"/"+d+" = "+n+"/"+den+" = "+fracStr(n,den)+".");},
    // 5. what percent of A is B
    function(){const p=pick([10,20,25,50,75,40,60,80,5]);const base=pick([20,40,50,60,80,100,200]);const b=p/100*base;if(b!==Math.round(b)||b===0)return arguments.callee();return typed("What percent of "+base+" is "+b+"? (just the number)",p,b+" ÷ "+base+" = "+fmt(b/base)+" = "+p+"%.");},
    // 6. percent increase
    function(){const base=pick([20,40,50,80,100,200,60]);const p=pick([10,20,25,50,5,15,30]);const inc=p/100*base;if(inc!==Math.round(inc))return arguments.callee();const ans=base+inc;return typed("A value of "+base+" increases by "+p+"%. What is the new value?",ans,p+"% of "+base+" = "+inc+"; "+base+" + "+inc+" = "+ans+".");},
    // 7. percent decrease / discount price
    function(){const base=pick([20,40,50,80,100,200,60]);const p=pick([10,20,25,50,5,15,30]);const dec=p/100*base;if(dec!==Math.round(dec))return arguments.callee();const ans=base-dec;return typed("A $"+base+" item is marked "+p+"% off. What is the sale price, in dollars?",ans,p+"% of "+base+" = "+dec+"; "+base+" − "+dec+" = "+ans+".");},
    // 8. order three fractions (least to greatest, give the smallest)
    function(){const set=[];const used=new Set();while(set.length<3){const a=rand(1,7),b=rand(2,9);if(a>=b)continue;const v=a/b;let dup=false;set.forEach(s=>{if(Math.abs(s.v-v)<1e-9)dup=true;});if(dup)continue;const key=fracStr(a,b);if(used.has(key))continue;used.add(key);set.push({s:a+"/"+b,v:v});}const sorted=set.slice().sort((x,y)=>x.v-y.v);const smallest=sorted[0].s;return mcText("Which of these is the SMALLEST: "+set.map(x=>x.s).join(", ")+"?",set.map(x=>x.s),smallest,"As decimals: "+set.map(x=>x.s+"≈"+fmt(x.v)).join(", ")+". Smallest is "+smallest+".");},
    // 9. multiply with mixed numbers -> improper then multiply by integer
    function(){const w=rand(1,4),n=rand(1,4),d=rand(n+1,6);const imp=w*d+n;const k=d;const ans=imp*k/d;return typed("Compute "+w+" "+n+"/"+d+" × "+k+".",ans,w+" "+n+"/"+d+" = "+imp+"/"+d+"; × "+k+" = "+imp+"/"+d+" × "+k+" = "+ans+".");},
    // 10. percent -> fraction (lowest terms)
    function(){const opt=pick([[25,1,4],[50,1,2],[75,3,4],[20,1,5],[40,2,5],[60,3,5],[80,4,5],[10,1,10],[5,1,20],[12,3,25],[15,3,20],[30,3,10]]);return typedFrac("Write "+opt[0]+"% as a fraction in lowest terms.",opt[1]+"/"+opt[2],fracStr(opt[1],opt[2]),opt[0]+"% = "+opt[0]+"/100 = "+fracStr(opt[1],opt[2])+".");},
    // 11. add three like fractions then simplify, result >1 sometimes -> keep improper
    function(){const d=rand(4,9);let a,b,c;do{a=rand(1,d);b=rand(1,d);c=rand(1,d);}while((a+b+c)===0||(a+b+c)%d===0);const n=a+b+c;return typedFrac("Add: "+a+"/"+d+" + "+b+"/"+d+" + "+c+"/"+d+". Give your answer as a fraction in lowest terms.",n+"/"+d,fracStr(n,d),"("+a+"+"+b+"+"+c+")/"+d+" = "+n+"/"+d+" = "+fracStr(n,d)+".");},
    // 12. comparing fraction vs decimal vs percent (which largest)
    function(){const items=[{label:"3/5",v:0.6},{label:"0.55",v:0.55},{label:"58%",v:0.58},{label:"1/2",v:0.5},{label:"0.7",v:0.7},{label:"65%",v:0.65},{label:"3/4",v:0.75},{label:"0.45",v:0.45},{label:"2/5",v:0.4}];const chosen=shuffle(items).slice(0,3);const largest=chosen.slice().sort((a,b)=>b.v-a.v)[0].label;return mcText("Which value is the LARGEST: "+chosen.map(x=>x.label).join(", ")+"?",chosen.map(x=>x.label),largest,"Convert all to decimals: "+chosen.map(x=>x.label+"="+x.v).join(", ")+". Largest is "+largest+".");}
  ],
  [ /* CHALLENGING */
    // 1. reverse percent: B is p% of what
    function(){const p=pick([10,20,25,50,40,80,5]);const whole=pick([20,40,50,80,100,200,60]);const b=p/100*whole;if(b!==Math.round(b)||b===0)return arguments.callee();return typed(b+" is "+p+"% of what number?",whole,b+" ÷ "+fmt(p/100)+" = "+whole+".");},
    // 2. successive discounts
    function(){const base=pick([100,200,80,50,40,160]);const p1=pick([10,20,25,50]);const p2=pick([10,20,25,50]);const a1=base*(1-p1/100);const a2=a1*(1-p2/100);if(a2!==Math.round(a2))return arguments.callee();return typed("A $"+base+" item gets "+p1+"% off, then "+p2+"% off the reduced price. Final price in dollars?",a2,"After "+p1+"% off: $"+a1+". Then "+p2+"% off: "+a1+" × "+fmt(1-p2/100)+" = $"+a2+".");},
    // 3. reverse percent after increase (original price before tax)
    function(){const orig=pick([20,40,50,80,100,200]);const p=pick([10,20,25,50,5]);const total=orig*(1+p/100);if(total!==Math.round(total))return arguments.callee();return typed("After a "+p+"% increase, a price is now $"+total+". What was the original price in dollars?",orig,"New = original × "+fmt(1+p/100)+". So original = "+total+" ÷ "+fmt(1+p/100)+" = $"+orig+".");},
    // 4. percent change between two values
    function(){const a=pick([20,40,50,80,100]);const p=pick([10,25,50,20,75]);const b=a+p/100*a;if(b!==Math.round(b))return arguments.callee();return typed("A quantity changes from "+a+" to "+b+". By what percent did it increase? (just the number)",p,"Change = "+(b-a)+"; "+(b-a)+" ÷ "+a+" = "+fmt((b-a)/a)+" = "+p+"%.");},
    // 5. multi-step: fraction of a fraction of a quantity
    function(){const opt1=pick([[1,2],[1,3],[2,3],[1,4],[3,4]]);const opt2=pick([[1,2],[1,3],[2,3],[1,4],[3,5]]);const k=rand(2,6);const total=opt1[1]*opt2[1]*k;const ans=opt1[0]*opt2[0]*k;return typed("What is "+opt1[0]+"/"+opt1[1]+" of "+opt2[0]+"/"+opt2[1]+" of "+total+"?",ans,opt2[0]+"/"+opt2[1]+" of "+total+" = "+(opt2[0]*opt1[1]*k)+", then "+opt1[0]+"/"+opt1[1]+" of that = "+ans+".");},
    // 6. complex fraction divided
    function(){const b=rand(3,5),a=rand(1,b-1),d=rand(3,5),c=rand(1,d-1);const n=a*d,den=b*c;const g=gcd(n,den);const simp=(den/g===1)?String(n/g):fracStr(n,den);return typedFrac("Simplify the complex fraction ("+a+"/"+b+") ÷ ("+c+"/"+d+"). Lowest terms.",n+"/"+den,simp,"Flip and multiply: "+a+"/"+b+" × "+d+"/"+c+" = "+n+"/"+den+" = "+simp+".");},
    // 7. word: how many pieces fit (division)
    function(){const opt=pick([[1,2],[1,3],[1,4],[2,3],[3,4],[1,6],[1,8]]);const whole=rand(2,6);const pieces=whole*opt[1]/opt[0];if(pieces!==Math.round(pieces))return arguments.callee();return typed("How many "+opt[0]+"/"+opt[1]+"-cup servings are in "+whole+" cups?",pieces,whole+" ÷ "+opt[0]+"/"+opt[1]+" = "+whole+" × "+opt[1]+"/"+opt[0]+" = "+pieces+".");},
    // 8. find original whole given a fractional part count
    function(){const opt=pick([[1,3],[1,4],[2,5],[3,5],[1,2],[3,4],[2,3]]);const k=rand(2,8);const part=opt[0]*k;const whole=opt[1]*k;return typed(part+" students are "+opt[0]+"/"+opt[1]+" of a class. How many students are in the whole class?",whole,part+" = "+opt[0]+"/"+opt[1]+" of whole, so one "+opt[1]+"th... whole = "+part+" ÷ "+opt[0]+"/"+opt[1]+" = "+whole+".");},
    // 9. add a mix of fraction + percent + decimal of a number
    function(){const base=pick([100,200,400,80,40]);const fa=pick([[1,2],[1,4],[1,5],[3,4]]);const p=pick([10,25,50,20]);const f=fa[0]/fa[1]*base;const pp=p/100*base;if(f!==Math.round(f)||pp!==Math.round(pp))return arguments.callee();const ans=f+pp;return typed("Compute "+fa[0]+"/"+fa[1]+" of "+base+" plus "+p+"% of "+base+".",ans,fa[0]+"/"+fa[1]+" of "+base+" = "+f+"; "+p+"% of "+base+" = "+pp+"; sum = "+ans+".");},
    // 10. tax then tip style two-step percent add
    function(){const base=pick([20,40,50,80,100]);const p1=pick([10,20,25]);const p2=pick([10,20,15]);const t1=p1/100*base;const t2=p2/100*base;if(t1!==Math.round(t1)||t2!==Math.round(t2))return arguments.callee();const ans=base+t1+t2;return typed("A $"+base+" bill has "+p1+"% tax and a "+p2+"% tip (both on the $"+base+"). What is the total in dollars?",ans,"Tax "+t1+" + tip "+t2+" added to "+base+" = "+ans+".");},
    // 11. compare growth: which is bigger, fraction or percent of different bases
    function(){const fa=pick([[1,2],[1,4],[3,4],[2,5]]);const baseF=pick([40,80,100,200]);const p=pick([10,25,50,20]);const baseP=pick([40,80,100,200]);const vF=fa[0]/fa[1]*baseF;const vP=p/100*baseP;if(vF!==Math.round(vF)||vP!==Math.round(vP)||vF===vP)return arguments.callee();const optA=fa[0]+"/"+fa[1]+" of "+baseF;const optB=p+"% of "+baseP;const bigger=vF>vP?optA:optB;return mcText("Which is larger: "+optA+", or "+optB+"?",[optA,optB],bigger,optA+" = "+vF+"; "+optB+" = "+vP+". Larger is "+bigger+".");},
    // 12. repeated halving / fraction power flavor
    function(){const start=pick([64,128,32,96,160,48]);const n=rand(2,3);let v=start;for(let i=0;i<n;i++)v=v/2;if(v!==Math.round(v))return arguments.callee();return typed("Start with "+start+". Take half, then half again"+(n===3?", then half a third time":"")+". What is the result?",v,start+" halved "+n+" times = "+start+" ÷ "+(Math.pow(2,n))+" = "+v+".");}
  ]
];

if (require.main === module) {
  let bad=0,total=0;
  TIERS.forEach((tier,ti)=>tier.forEach((fn,fi)=>{ const seen=new Set(); for(let k=0;k<80;k++){ const q=fn(); total++;
    if(!q.q||q.explain==null||!q.type){bad++;console.log("STRUCT t"+ti+" f"+fi,JSON.stringify(q));continue;}
    if(q.type==="mc"){ if(!Array.isArray(q.choices)||q.choices.length<2||q.answer<0||q.answer>=q.choices.length||new Set(q.choices).size!==q.choices.length){bad++;console.log("MC t"+ti+" f"+fi,JSON.stringify(q));} }
    else { if(!q.accept.length||/undefined|NaN/.test(q.q+q.accept[0])){bad++;console.log("TYPED t"+ti+" f"+fi,JSON.stringify(q));} }
    seen.add(q.q); }
    if(seen.size<6) console.log("LOW-VARIETY t"+ti+" f"+fi+" only "+seen.size+" unique"); }));
  console.log("tier sizes:",TIERS.map(t=>t.length),"checked",total,"problems",bad);
}
module.exports = TIERS;
