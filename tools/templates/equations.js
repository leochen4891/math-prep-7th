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

// ---------- MEDIUM ----------
function m_oneStepAdd(){
  const x=rand(2,20),b=rand(1,15);
  return typed("Solve: x + "+b+" = "+(x+b)+"<br>x = ?",x,"Subtract "+b+" from both sides: x = "+(x+b)+" − "+b+" = "+x+".");
}
function m_oneStepSub(){
  const x=rand(5,25),b=rand(1,15);
  return typed("Solve: x − "+b+" = "+(x-b)+"<br>x = ?",x,"Add "+b+" to both sides: x = "+(x-b)+" + "+b+" = "+x+".");
}
function m_oneStepMul(){
  const a=rand(2,9),x=rand(2,12);
  return typed("Solve: "+a+"x = "+(a*x)+"<br>x = ?",x,"Divide both sides by "+a+": x = "+(a*x)+" ÷ "+a+" = "+x+".");
}
function m_oneStepDiv(){
  const a=rand(2,8),x=rand(2,9);
  return typed("Solve: x ÷ "+a+" = "+x+"<br>x = ?",x*a,"Multiply both sides by "+a+": x = "+x+" × "+a+" = "+(x*a)+".");
}
function m_twoStep(){
  const a=rand(2,6),x=rand(2,9),b=rand(1,12);
  return typed("Solve: "+a+"x + "+b+" = "+(a*x+b)+"<br>x = ?",x,"Subtract "+b+": "+a+"x = "+(a*x)+". Divide by "+a+": x = "+x+".");
}
function m_twoStepSub(){
  const a=rand(2,6),x=rand(2,9),b=rand(1,12);
  return typed("Solve: "+a+"x − "+b+" = "+(a*x-b)+"<br>x = ?",x,"Add "+b+": "+a+"x = "+(a*x)+". Divide by "+a+": x = "+x+".");
}
function m_translateOneStep(){
  const x=rand(3,15),b=rand(2,12);
  return typed("A number plus "+b+" equals "+(x+b)+". What is the number?",x,"n + "+b+" = "+(x+b)+" → n = "+x+".");
}
function m_checkSolution(){
  const a=rand(2,5),x=rand(2,8),b=rand(1,9);const rhs=a*x+b;
  return mcText("Which value of x makes "+a+"x + "+b+" = "+rhs+" true?",[String(x),String(x+1),String(x-1),String(x+2)],String(x),"Test x = "+x+": "+a+"×"+x+" + "+b+" = "+rhs+". ✓");
}
function m_fracEqDiv(){
  const a=rand(2,6),q=rand(2,8),b=rand(1,8);
  const x=a*q; // ensure x/a is a whole number
  // x/a + b = c  where x/a = q
  return typed("Solve: x/"+a+" + "+b+" = "+(q+b)+"<br>x = ?",x,"Subtract "+b+": x/"+a+" = "+q+". Multiply by "+a+": x = "+x+".");
}
function m_ineqOneStepAdd(){
  const b=rand(1,12),r=rand(2,15);
  // x + b > r  -> x > r-b
  const sol=r-b;
  const choices=["x > "+sol,"x < "+sol,"x > "+(sol+1),"x < "+(sol-1)];
  return mcText("Solve the inequality: x + "+b+" > "+r,choices,"x > "+sol,"Subtract "+b+" from both sides: x > "+r+" − "+b+" = "+sol+".");
}
function m_ineqOneStepMul(){
  const a=rand(2,6),k=rand(2,8);const r=a*k;
  // a x <= r -> x <= k
  const choices=["x ≤ "+k,"x ≥ "+k,"x ≤ "+(k+1),"x ≥ "+(k-1)];
  return mcText("Solve the inequality: "+a+"x ≤ "+r,choices,"x ≤ "+k,"Divide both sides by "+a+" (positive, no flip): x ≤ "+k+".");
}
function m_ineqWhichValue(){
  const b=rand(1,8),r=rand(3,12)+b; // x + b > r solution x> r-b
  const sol=r-b;const good=sol+rand(1,4);const bad1=sol-rand(1,3);
  return mcText("Which value of x makes x + "+b+" > "+r+" true?",[String(good),String(bad1),String(sol),String(sol-5)],String(good),"Need x > "+sol+". "+good+" > "+sol+" ✓.");
}

// ---------- HARD ----------
function h_bothSides(){
  const a=rand(3,7),b=rand(1,9),x=rand(2,9);
  let c=rand(1,a-1); // c < a so positive solution
  const left_const=b, right_const=a*x+b-c*x;
  // a x + b = c x + right_const  where right_const computed so x is solution
  const rc=a*x+b-c*x;
  return typed("Solve: "+a+"x + "+b+" = "+c+"x + "+rc+"<br>x = ?",x,"Subtract "+c+"x: "+(a-c)+"x + "+b+" = "+rc+". Subtract "+b+": "+(a-c)+"x = "+(rc-b)+". Divide: x = "+x+".");
}
function h_distribute(){
  const a=rand(2,5),b=rand(1,6),x=rand(2,8);
  // a(x + b) = result
  const res=a*(x+b);
  return typed("Solve: "+a+"(x + "+b+") = "+res+"<br>x = ?",x,"Divide by "+a+": x + "+b+" = "+(res/a)+". Subtract "+b+": x = "+x+".");
}
function h_distributeSub(){
  const a=rand(2,5),b=rand(1,6),x=rand(3,9);
  const res=a*(x-b);
  return typed("Solve: "+a+"(x − "+b+") = "+res+"<br>x = ?",x,"Divide by "+a+": x − "+b+" = "+(res/a)+". Add "+b+": x = "+x+".");
}
function h_negCoeff(){
  // a - b x = c
  const b=rand(2,5),x=rand(2,8),a=rand(20,40);
  const c=a-b*x;
  return typed("Solve: "+a+" − "+b+"x = "+c+"<br>x = ?",x,"Subtract "+a+": −"+b+"x = "+(c-a)+". Divide by −"+b+": x = "+x+".");
}
function h_fracEqGroup(){
  // (x + b)/d = r
  const d=rand(2,6),r=rand(2,8),b=rand(1,10);
  const x=r*d-b;
  return typed("Solve: (x + "+b+")/"+d+" = "+r+"<br>x = ?",x,"Multiply by "+d+": x + "+b+" = "+(r*d)+". Subtract "+b+": x = "+x+".");
}
function h_fracEqMinus(){
  // x/a - b = c
  const a=rand(2,6),b=rand(1,8);
  const xv=a*rand(2,6); // ensure divisible
  const c=xv/a-b;
  return typed("Solve: x/"+a+" − "+b+" = "+c+"<br>x = ?",xv,"Add "+b+": x/"+a+" = "+(xv/a)+". Multiply by "+a+": x = "+xv+".");
}
function h_translateTwoStep(){
  const a=rand(2,5),x=rand(2,9),b=rand(2,10);
  const res=a*x+b;
  return typed(a+" times a number, increased by "+b+", is "+res+". What is the number?",x,a+"n + "+b+" = "+res+" → "+a+"n = "+(res-b)+" → n = "+x+".");
}
function h_twoStepDivAdd(){
  // x/a + b = c
  const a=rand(2,5);const x=a*rand(2,8);const b=rand(1,9);
  const c=x/a+b;
  return typed("Solve: x/"+a+" + "+b+" = "+c+"<br>x = ?",x,"Subtract "+b+": x/"+a+" = "+(x/a)+". Multiply by "+a+": x = "+x+".");
}
function h_ineqTwoStep(){
  const a=rand(2,5),b=rand(1,9),k=rand(2,8);
  const r=a*k+b; // a x + b >= r -> x >= k
  const choices=["x ≥ "+k,"x ≤ "+k,"x > "+k,"x < "+k];
  return mcText("Solve: "+a+"x + "+b+" ≥ "+r,choices,"x ≥ "+k,"Subtract "+b+": "+a+"x ≥ "+(r-b)+". Divide by "+a+": x ≥ "+k+".");
}
function h_ineqSignFlip(){
  // -a x < c  -> x > -c/a, keep clean: -a x < a*k  -> x > -k
  const a=rand(2,5),k=rand(2,8);
  const r=a*k; // -a x < r -> x > -k  (divide by -a flips)
  const choices=["x > -"+k,"x < -"+k,"x > "+k,"x < "+k];
  return mcText("Solve: −"+a+"x < "+r,choices,"x > -"+k,"Divide both sides by −"+a+" and FLIP the sign: x > −"+k+".");
}
function h_ineqBothSides(){
  // a x + b > c x + d  with a>c
  const a=rand(4,7),c=rand(1,3),k=rand(2,7);
  // solution x > k: (a-c)x > d-b. choose b, then d = (a-c)*k + b ... wait sign
  const b=rand(1,8);
  const d=(a-c)*k+b; // a x + b > c x + d <=> (a-c)x > d - b = (a-c)k <=> x>k
  const choices=["x > "+k,"x < "+k,"x ≥ "+k,"x ≤ "+k];
  return mcText("Solve: "+a+"x + "+b+" > "+c+"x + "+d,choices,"x > "+k,"Subtract "+c+"x: "+(a-c)+"x + "+b+" > "+d+". Subtract "+b+": "+(a-c)+"x > "+(d-b)+". Divide: x > "+k+".");
}

// ---------- CHALLENGING ----------
function c_distributeBothSides(){
  // a(x+b) = c x + d
  const a=rand(3,6),b=rand(1,5),c=rand(1,2),x=rand(2,8);
  const left=a*(x+b); // = a x + a b
  const d=left-c*x;
  return typed("Solve: "+a+"(x + "+b+") = "+c+"x + "+d+"<br>x = ?",x,"Expand: "+a+"x + "+(a*b)+" = "+c+"x + "+d+". Subtract "+c+"x: "+(a-c)+"x + "+(a*b)+" = "+d+". Solve: x = "+x+".");
}
function c_doubleDistribute(){
  // a(x+b) + c(x+e) = total
  const a=rand(2,4),c=rand(2,4),b=rand(1,4),e=rand(1,4),x=rand(2,6);
  const total=a*(x+b)+c*(x+e);
  const coef=a+c, constv=a*b+c*e;
  return typed("Solve: "+a+"(x + "+b+") + "+c+"(x + "+e+") = "+total+"<br>x = ?",x,"Expand: "+coef+"x + "+constv+" = "+total+". Subtract "+constv+": "+coef+"x = "+(total-constv)+". Divide: x = "+x+".");
}
function c_fractionCoef(){
  // (a/b) x = c  with clean x
  const b=rand(2,5),a=rand(2,4);const x=b*rand(1,4); // multiple of b
  const c=a*x/b;
  return typed("Solve: ("+a+"/"+b+")x = "+c+"<br>x = ?",x,"Multiply both sides by "+b+"/"+a+": x = "+c+" × "+b+"/"+a+" = "+x+".");
}
function c_negBothSides(){
  // a - b x = c - d x   choose so x positive
  const b=rand(3,6),d=rand(1,2),x=rand(2,7);
  const a=rand(10,30);
  const c=a-b*x+d*x; // a - b x = c - d x  => c = a -b x + d x
  return typed("Solve: "+a+" − "+b+"x = "+c+" − "+d+"x<br>x = ?",x,"Add "+b+"x both sides: "+a+" = "+c+" + "+(b-d)+"x. Subtract "+c+": "+(a-c)+" = "+(b-d)+"x. Divide: x = "+x+".");
}
function c_translateConsec(){
  // sum of n and n+1 = total
  const n=rand(5,30);const total=n+(n+1);
  return typed("Two consecutive integers add up to "+total+". What is the SMALLER integer?",n,"n + (n+1) = "+total+" → 2n + 1 = "+total+" → 2n = "+(total-1)+" → n = "+n+".");
}
function c_ineqDistribute(){
  // a(x + b) > r  solution x > r/a - b
  const a=rand(2,4),b=rand(1,4),k=rand(2,7);
  const r=a*(k+b); // a(x+b) > r => x+b > k+b => x > k
  const choices=["x > "+k,"x < "+k,"x ≥ "+k,"x ≤ "+k];
  return mcText("Solve: "+a+"(x + "+b+") > "+r,choices,"x > "+k,"Divide by "+a+": x + "+b+" > "+(k+b)+". Subtract "+b+": x > "+k+".");
}
function c_ineqNegTwoStep(){
  // b - a x >= c  -> -a x >= c - b -> x <= (b-c)/a  flip
  const a=rand(2,4),k=rand(2,7),b=rand(20,40);
  const c=b-a*k; // b - a x >= c => -a x >= c-b => a x <= b-c => x <= k
  const choices=["x ≤ "+k,"x ≥ "+k,"x < "+k,"x > "+k];
  return mcText("Solve: "+b+" − "+a+"x ≥ "+c,choices,"x ≤ "+k,"Subtract "+b+": −"+a+"x ≥ "+(c-b)+". Divide by −"+a+" and FLIP: x ≤ "+k+".");
}
function c_solveForY(){
  // a x + b y = c, given x value find y? keep one var: solve b y = c - a*xv
  const a=rand(2,4),b=rand(2,4),xv=rand(1,4);const y=rand(2,6);
  const c=a*xv+b*y;
  return typed("If x = "+xv+", solve for y: "+a+"x + "+b+"y = "+c+"<br>y = ?",y,a+"×"+xv+" = "+(a*xv)+". "+b+"y = "+c+" − "+(a*xv)+" = "+(b*y)+". y = "+y+".");
}
function c_twoStepFracBoth(){
  // (x - b)/d = r  with negative possible
  const d=rand(2,5),r=rand(2,7),b=rand(1,9);
  const x=r*d+b;
  return typed("Solve: (x − "+b+")/"+d+" = "+r+"<br>x = ?",x,"Multiply by "+d+": x − "+b+" = "+(r*d)+". Add "+b+": x = "+x+".");
}
function c_perimeterEq(){
  // rectangle: 2(L+W)=P, given W find L
  const w=rand(2,9),l=rand(w+1,w+8);const p=2*(l+w);
  return typed("A rectangle has perimeter "+p+" and width "+w+". Find the length.<br>L = ?",l,"2(L + "+w+") = "+p+" → L + "+w+" = "+(p/2)+" → L = "+l+".");
}
function c_ineqVarBothNeg(){
  // a x + b < c x + d with a<c so flip when moving: (a-c)x < d-b, a-c negative -> flip
  const a=rand(1,2),c=rand(4,6),k=rand(2,7),b=rand(1,8);
  // want x < k: (a-c) x < d-b, a-c<0. Divide flips to x > (d-b)/(a-c)... let's solve forward.
  // a x + b < c x + d  => b - d < (c-a) x => x > (b-d)/(c-a). To get x>k pick d so (b-d)/(c-a)=k => d = b-(c-a)k
  const d=b-(c-a)*k; // gives x > k
  const choices=["x > "+k,"x < "+k,"x ≥ "+k,"x ≤ "+k];
  return mcText("Solve: "+a+"x + "+b+" < "+c+"x "+(d<0?"− "+(-d):"+ "+d),choices,"x > "+k,"Subtract "+a+"x and "+(d<0?"add "+(-d):"subtract "+d)+": "+(b-d)+" < "+(c-a)+"x. Divide by "+(c-a)+": x > "+k+".");
}

const TIERS = [
  [m_oneStepAdd,m_oneStepSub,m_oneStepMul,m_oneStepDiv,m_twoStep,m_twoStepSub,m_translateOneStep,m_checkSolution,m_fracEqDiv,m_ineqOneStepAdd,m_ineqOneStepMul,m_ineqWhichValue],
  [h_bothSides,h_distribute,h_distributeSub,h_negCoeff,h_fracEqGroup,h_fracEqMinus,h_translateTwoStep,h_twoStepDivAdd,h_ineqTwoStep,h_ineqSignFlip,h_ineqBothSides],
  [c_distributeBothSides,c_doubleDistribute,c_fractionCoef,c_negBothSides,c_translateConsec,c_ineqDistribute,c_ineqNegTwoStep,c_solveForY,c_twoStepFracBoth,c_perimeterEq,c_ineqVarBothNeg]
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
