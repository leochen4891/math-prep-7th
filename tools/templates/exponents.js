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
const SUPALL={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹"};
function sup(e){return SUPALL[e]!==undefined?SUPALL[e]:String(e).split("").map(d=>SUPALL[d]).join("");}
function typed(q,ans,explain,ph){const a=String(ans);const accept=[a];if(a.indexOf("0.")===0)accept.push(a.slice(1));return {type:"typed",q:q,accept:accept,explain:explain,placeholder:ph||"Type a number"};}
function typedFrac(q,raw,simp,explain){const accept=[simp];if(accept.indexOf(raw)===-1)accept.push(raw);return {type:"typed",q:q,accept:accept,explain:explain,placeholder:"Type a fraction (like a/b)"};}
function mcNum(q,answer,distractors,explain){const set=[answer];(distractors||[]).forEach(d=>{if(set.indexOf(d)===-1&&d!==answer)set.push(d);});let g=0;while(set.length<4&&g<200){const c=answer+pick([-10,-5,-3,-2,-1,1,2,3,4,5,10]);if(set.indexOf(c)===-1)set.push(c);g++;}const choices=shuffle(set.slice(0,4)).map(String);return {type:"mc",q:q,choices:choices,answer:choices.indexOf(String(answer)),explain:explain};}
function mcText(q,choices,correct,explain){const sh=shuffle(choices);return {type:"mc",q:q,choices:sh,answer:sh.indexOf(correct),explain:explain};}

// ---------- MEDIUM ----------
function m_square(){
  const n=rand(2,12);
  return typed("Evaluate: "+n+SUP[2],n*n,n+SUP[2]+" = "+n+" × "+n+" = "+(n*n)+".");
}
function m_cube(){
  const n=rand(2,8);
  return typed("Evaluate: "+n+SUP[3],n*n*n,n+SUP[3]+" = "+n+" × "+n+" × "+n+" = "+(n*n*n)+".");
}
function m_powerOf10(){
  const e=rand(2,8);
  return typed("Evaluate: 10"+sup(e),Math.pow(10,e),"10"+sup(e)+" = 1 followed by "+e+" zeros = "+Math.pow(10,e)+".");
}
function m_sqrt(){
  const n=rand(2,12);
  return typed("Evaluate: √"+(n*n),n,"√"+(n*n)+" = "+n+" because "+n+"² = "+(n*n)+".");
}
function m_zeroExp(){
  const n=rand(2,20);
  return typed("Evaluate: "+n+"⁰",1,"Any nonzero number to the 0 power is 1.");
}
function m_oneExp(){
  const n=rand(2,30);
  return typed("Evaluate: "+n+"¹",n,"Any number to the 1st power is itself: "+n+".");
}
function m_higherPower(){
  const opts=[[2,4],[2,5],[2,6],[3,4],[2,7],[5,3]];
  const c=pick(opts);const b=c[0],e=c[1];
  return typed("Evaluate: "+b+SUP[e],Math.pow(b,e),b+SUP[e]+" = "+Array(e).fill(b).join(" × ")+" = "+Math.pow(b,e)+".");
}
function m_productRuleExp(){
  const a=rand(2,6),b=rand(2,6);
  return typed("Simplify and give the exponent: x"+SUP[a]+" · x"+SUP[b]+" = x^?",a+b,"Add exponents: "+a+" + "+b+" = "+(a+b)+".");
}
function m_quotientRuleExp(){
  const a=rand(5,9),b=rand(2,4);
  return typed("Simplify and give the exponent: x"+sup(a)+" ÷ x"+sup(b)+" = x^?",a-b,"Subtract exponents: "+a+" − "+b+" = "+(a-b)+".");
}
function m_negBaseEven(){
  const n=rand(2,9);
  return typed("Evaluate: (−"+n+")"+SUP[2],n*n,"A negative times a negative is positive: (−"+n+")² = "+(n*n)+".");
}
function m_orderOpsExp(){
  const a=rand(2,5),b=rand(2,4),c=rand(1,6);
  const val=a*a+b*c;
  return typed("Evaluate: "+a+SUP[2]+" + "+b+" × "+c,val,a+"² = "+(a*a)+"; "+b+" × "+c+" = "+(b*c)+"; sum = "+val+".");
}
function m_solveSquare(){
  const n=rand(2,12);
  return typed("Solve for the positive value of x: x² = "+(n*n)+"<br>x = ?",n,"x = √"+(n*n)+" = "+n+".");
}

// ---------- HARD ----------
function h_powerOfPower(){
  const a=rand(2,5),b=rand(2,4);
  return typed("Simplify and give the exponent: (x"+SUP[a]+")"+SUP[b]+" = x^?",a*b,"Multiply exponents: "+a+" × "+b+" = "+(a*b)+".");
}
function h_negBaseOdd(){
  const n=rand(2,8);
  return typed("Evaluate: (−"+n+")"+SUP[3],-(n*n*n),"An odd power keeps the negative sign: (−"+n+")³ = −"+(n*n*n)+".");
}
function h_diffOfSquares(){
  const a=rand(5,12),b=rand(1,4);
  const val=a*a-b*b;
  return typed("Evaluate: "+a+SUP[2]+" − "+b+SUP[2],val,a+"² = "+(a*a)+", "+b+"² = "+(b*b)+", difference = "+val+".");
}
function h_diffOfCubes(){
  const a=rand(3,6),b=rand(1,3);
  const val=a*a*a-b*b*b;
  return typed("Evaluate: "+a+SUP[3]+" − "+b+SUP[3],val,a+"³ = "+(a*a*a)+", "+b+"³ = "+(b*b*b)+", difference = "+val+".");
}
function h_orderOpsParen(){
  const a=rand(2,5),b=rand(1,4);
  const val=(a+b)*(a+b);
  return typed("Evaluate: ("+a+" + "+b+")"+SUP[2],val,"("+a+" + "+b+") = "+(a+b)+", then squared = "+val+".");
}
function h_productRuleEvalNum(){
  const b=pick([2,3,5]);const e1=rand(2,3),e2=rand(2,3);
  const val=Math.pow(b,e1+e2);
  return typed("Evaluate: "+b+SUP[e1]+" · "+b+SUP[e2],val,"Add exponents: "+b+"^("+e1+"+"+e2+") = "+b+"^"+(e1+e2)+" = "+val+".");
}
function h_quotientEvalNum(){
  const b=pick([2,3,10]);const e1=rand(4,6),e2=rand(1,2);
  const val=Math.pow(b,e1-e2);
  return typed("Evaluate: "+b+sup(e1)+" ÷ "+b+sup(e2),val,"Subtract exponents: "+b+"^("+e1+"−"+e2+") = "+b+"^"+(e1-e2)+" = "+val+".");
}
function h_orderOpsMixed(){
  const a=rand(2,4),b=rand(2,3),c=rand(2,5);
  const val=a*a*a-b*b*c;
  return typed("Evaluate: "+a+SUP[3]+" − "+b+SUP[2]+" × "+c,val,a+"³ = "+(a*a*a)+"; "+b+"² × "+c+" = "+(b*b)+" × "+c+" = "+(b*b*c)+"; "+(a*a*a)+" − "+(b*b*c)+" = "+val+".");
}
function h_sqrtSum(){
  const a=rand(2,9),b=rand(2,9);
  return typed("Evaluate: √"+(a*a)+" + √"+(b*b),a+b,"√"+(a*a)+" = "+a+", √"+(b*b)+" = "+b+", sum = "+(a+b)+".");
}
function h_solveSquareLarger(){
  const n=rand(10,20);
  return typed("Solve for the positive value of x: x² = "+(n*n)+"<br>x = ?",n,"x = √"+(n*n)+" = "+n+".");
}
function h_powerOf10Mult(){
  const a=rand(2,9);const e=rand(2,4);
  return typed("Evaluate: "+a+" × 10"+SUP[e],a*Math.pow(10,e),a+" × "+Math.pow(10,e)+" = "+(a*Math.pow(10,e))+".");
}
function h_combinedExpLaws(){
  const a=rand(2,4),b=rand(2,4),c=rand(2,3);
  // x^a * x^b then ^c -> exponent (a+b)*c
  return typed("Give the exponent: (x"+SUP[a]+" · x"+SUP[b]+")"+SUP[c]+" = x^?",(a+b)*c,"Inside: "+a+"+"+b+" = "+(a+b)+". Then × "+c+" = "+((a+b)*c)+".");
}

// ---------- CHALLENGING ----------
function c_nestedPower(){
  const a=rand(2,3),b=rand(2,3),cc=rand(2,3);
  // ((x^a)^b)^c -> a*b*c
  return typed("Give the exponent: ((x"+SUP[a]+")"+SUP[b]+")"+SUP[cc]+" = x^?",a*b*cc,"Multiply all: "+a+" × "+b+" × "+cc+" = "+(a*b*cc)+".");
}
function c_negBasePower(){
  const n=rand(2,4);const e=pick([3,4,5]);
  const val=Math.pow(-n,e);
  return typed("Evaluate: (−"+n+")"+SUP[e],val,"Exponent "+e+" is "+(e%2===0?"even → positive":"odd → negative")+": "+val+".");
}
function c_mixedSqrtSquare(){
  const a=rand(3,9),b=rand(2,6);
  const val=a*a-b;
  // sqrt of perfect square minus something? make: (√(a²))² ... keep clean: √(a²) then squared = a²
  return typed("Evaluate: (√"+(a*a)+")² − "+b,val,"√"+(a*a)+" = "+a+", squared = "+(a*a)+"; "+(a*a)+" − "+b+" = "+val+".");
}
function c_orderOpsHeavy(){
  const a=rand(2,3),b=rand(2,4),c=rand(2,4);
  const val=a*a*a+b*b-c;
  return typed("Evaluate: "+a+SUP[3]+" + "+b+SUP[2]+" − "+c,val,a+"³ = "+(a*a*a)+"; "+b+"² = "+(b*b)+"; "+(a*a*a)+" + "+(b*b)+" − "+c+" = "+val+".");
}
function c_factorAsPower(){
  // express n as 2^k or 3^k
  const opts=[[8,2,3],[16,2,4],[32,2,5],[27,3,3],[81,3,4],[64,2,6],[125,5,3],[64,4,3]];
  const o=pick(opts);
  return typed(o[0]+" = "+o[1]+"^?  (find the exponent)",o[2],o[1]+"^"+o[2]+" = "+o[0]+".");
}
function c_compareExp(){
  // which is larger 2^5 vs 3^3 etc -> mcText
  const pairs=[["2⁵","3³",32,27],["2⁴","4²",16,16],["3³","5²",27,25],["2⁶","4³",64,64],["3⁴","9²",81,81],["2⁷","5³",128,125]];
  const p=pick(pairs);
  let correct;
  if(p[2]>p[3])correct=p[0]; else if(p[3]>p[2])correct=p[1]; else correct="Equal";
  return mcText("Which is larger?  "+p[0]+"  or  "+p[1]+"?",[p[0],p[1],"Equal"],correct,p[0]+" = "+p[2]+", "+p[1]+" = "+p[3]+". "+(correct==="Equal"?"They are equal.":correct+" is larger."));
}
function c_solveExpEq(){
  // 2^x = 32 -> x
  const opts=[[2,5,32],[2,4,16],[3,3,27],[2,6,64],[3,4,81],[5,3,125],[2,3,8]];
  const o=pick(opts);
  return typed("Solve for x: "+o[0]+"^x = "+o[2]+"<br>x = ?",o[1],o[0]+"^"+o[1]+" = "+o[2]+", so x = "+o[1]+".");
}
function c_a2plusb2(){
  const a=rand(3,9),b=rand(2,7);
  const val=a*a+b*b;
  return typed("Evaluate: "+a+SUP[2]+" + "+b+SUP[2],val,a+"² = "+(a*a)+", "+b+"² = "+(b*b)+", sum = "+val+".");
}
function c_powerQuotientToValue(){
  const b=pick([2,3]);const e1=rand(5,7),e2=rand(1,2),e3=rand(1,2);
  const exp=e1-e2-e3;const val=Math.pow(b,exp);
  return typed("Evaluate: "+b+sup(e1)+" ÷ ("+b+sup(e2)+" · "+b+sup(e3)+")",val,"Denominator exponent: "+e2+"+"+e3+" = "+(e2+e3)+". "+b+"^("+e1+"−"+(e2+e3)+") = "+b+"^"+exp+" = "+val+".");
}
function c_sqrtProduct(){
  // sqrt(a^2 * b^2) = a*b, pick perfect squares
  const a=rand(2,6),b=rand(2,6);
  return typed("Evaluate: √"+(a*a*b*b),a*b,"√"+(a*a*b*b)+" = "+a+" × "+b+" = "+(a*b)+" since ("+(a*b)+")² = "+(a*a*b*b)+".");
}
function c_distributeExp(){
  // (ab)^2 = a^2 b^2 numeric: (2*3)^2
  const a=rand(2,5),b=rand(2,5);
  const val=(a*b)*(a*b);
  return typed("Evaluate: ("+a+" × "+b+")"+SUP[2],val,"("+a+" × "+b+") = "+(a*b)+", squared = "+val+".");
}

const TIERS = [
  [m_square,m_cube,m_powerOf10,m_sqrt,m_zeroExp,m_oneExp,m_higherPower,m_productRuleExp,m_quotientRuleExp,m_negBaseEven,m_orderOpsExp,m_solveSquare],
  [h_powerOfPower,h_negBaseOdd,h_diffOfSquares,h_diffOfCubes,h_orderOpsParen,h_productRuleEvalNum,h_quotientEvalNum,h_orderOpsMixed,h_sqrtSum,h_solveSquareLarger,h_powerOf10Mult,h_combinedExpLaws],
  [c_nestedPower,c_negBasePower,c_mixedSqrtSquare,c_orderOpsHeavy,c_factorAsPower,c_compareExp,c_solveExpEq,c_a2plusb2,c_powerQuotientToValue,c_sqrtProduct,c_distributeExp]
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
