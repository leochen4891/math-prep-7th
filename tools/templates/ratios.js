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
function m_writeRatio(){
  const items=pick([["apples","oranges"],["red","blue"],["cats","dogs"],["boys","girls"],["pens","pencils"]]);
  let a=rand(2,12),b=rand(2,12);
  const g=gcd(a,b);
  return typedFrac("A basket has "+a+" "+items[0]+" and "+b+" "+items[1]+". Write the ratio of "+items[0]+" to "+items[1]+" in simplest form.",a+"/"+b,(a/g)+"/"+(b/g),"Ratio "+a+":"+b+" → divide by GCD "+g+" → "+(a/g)+":"+(b/g)+".");
}
function m_simplifyRatio(){
  const k=rand(2,8); let a=rand(2,9),b=rand(2,9);
  while(gcd(a,b)!==1){b=rand(2,9);}
  return typedFrac("Simplify the ratio "+(a*k)+" : "+(b*k)+" to lowest terms.",(a*k)+"/"+(b*k),a+"/"+b,(a*k)+":"+(b*k)+" share factor "+k+" → "+a+":"+b+".");
}
function m_equivRatio(){
  const a=rand(2,9),b=rand(2,9),k=rand(2,6);
  return typed("Find the missing value: "+a+" : "+b+" = "+(a*k)+" : ?",b*k,a+" was multiplied by "+k+" to get "+(a*k)+", so "+b+"×"+k+" = "+(b*k)+".");
}
function m_unitRate(){
  const units=pick([["miles","hours","mph"],["words","minutes","words per minute"],["dollars","items","dollars each"]]);
  const r=rand(3,15),n=rand(2,8);
  return typed("A car goes "+(r*n)+" "+units[0]+" in "+n+" "+units[1]+". What is the unit rate ("+units[2]+")?",r,(r*n)+" ÷ "+n+" = "+r+" "+units[2]+".");
}
function m_proportion(){
  const a=rand(2,9),b=rand(2,9),k=rand(2,7);
  // a/b = x/(b*k)  => x = a*k
  return typed("Solve the proportion: "+a+"/"+b+" = x/"+(b*k)+"<br>x = ?",a*k,"Cross-multiply: "+a+"×"+(b*k)+" = "+b+"×x → x = "+(a*k)+".");
}
function m_percentOf(){
  const p=pick([10,20,25,50,5,40,75]);const base=pick([20,40,60,80,100,120,200]);
  const ans=p*base/100;
  return typed("What is "+p+"% of "+base+"?",ans,p+"% = "+(p/100)+"; "+(p/100)+" × "+base+" = "+ans+".");
}
function m_whatPercent(){
  const choices=[[5,20],[6,24],[7,28],[9,36],[15,60],[12,48],[8,20],[15,75],[18,90],[14,70]];
  const c=pick(choices);const pa=c[0],wh=c[1];const pct=pa/wh*100;
  return typed("What percent of "+wh+" is "+pa+"?",pct,pa+" ÷ "+wh+" = "+fmt(pa/wh)+" = "+pct+"%.");
}
function m_unitRateThenMult(){
  const each=rand(2,9);const buy=rand(3,8);const have=buy+rand(2,5);
  return typed(buy+" notebooks cost $"+(each*buy)+". At that rate, how much do "+have+" notebooks cost (in dollars)?",each*have,"Each = $"+(each*buy)+" ÷ "+buy+" = $"+each+". "+have+" × $"+each+" = $"+(each*have)+".");
}
function m_distRT(){
  const r=rand(20,65);const t=rand(2,6);
  return typed("A train travels at "+r+" mph for "+t+" hours. How far does it go (miles)?",r*t,"distance = rate × time = "+r+" × "+t+" = "+(r*t)+" miles.");
}
function m_recipeScale(){
  const per=rand(2,5);const batches=rand(2,5);
  return typed("A recipe uses "+per+" cups of flour per batch. How many cups for "+batches+" batches?",per*batches,per+" × "+batches+" = "+(per*batches)+" cups.");
}
function m_threePartTotal(){
  const a=rand(1,4),b=rand(1,4),c=rand(1,4);const total=pick([1,2,3,4])*(a+b+c);
  const unit=total/(a+b+c);
  return typed("A sum of $"+total+" is split in the ratio "+a+":"+b+":"+c+". How much is one share for the part with ratio "+a+"? (dollars)",a*unit,"Total parts = "+(a+b+c)+". Each part = $"+total+" ÷ "+(a+b+c)+" = $"+unit+". Times "+a+" = $"+(a*unit)+".");
}

// ---------- HARD ----------
function h_percentIncrease(){
  const base=pick([20,40,50,80,200,25,60]);const pct=pick([10,20,25,50,5,15]);
  const inc=base*pct/100;
  return typed("A price rises from $"+base+" by "+pct+"%. What is the new price (dollars)?",base+inc,"Increase = "+pct+"% × "+base+" = $"+inc+". New = "+base+" + "+inc+" = $"+(base+inc)+".");
}
function h_percentDecrease(){
  const base=pick([40,50,80,200,60,100,120]);const pct=pick([10,20,25,50,5,15]);
  const dec=base*pct/100;
  return typed("A value of "+base+" decreases by "+pct+"%. What is the result?",base-dec,"Decrease = "+pct+"% × "+base+" = "+dec+". "+base+" − "+dec+" = "+(base-dec)+".");
}
function h_salePrice(){
  const base=pick([20,40,50,80,60,100,25]);const pct=pick([10,20,25,50,15,30]);
  const disc=base*pct/100;
  return typed("A $"+base+" jacket is "+pct+"% off. What is the sale price (dollars)?",base-disc,"Discount = "+pct+"% × $"+base+" = $"+disc+". Sale = $"+(base-disc)+".");
}
function h_solveProportionWords(){
  const rate=rand(2,6);const a=rand(2,6);const items=a*rate; // a workers->items? keep simple proportion
  const b=a+rand(1,4);
  return typed("If "+a+" machines make "+items+" parts, how many parts do "+b+" machines make at the same rate?",b*rate,"Per machine = "+items+" ÷ "+a+" = "+rate+". "+b+" × "+rate+" = "+(b*rate)+".");
}
function h_betterBuy(){
  const sizeA=pick([2,3,4]);const eachA=rand(2,4);const priceA=sizeA*eachA;
  let eachB=eachA; while(eachB===eachA){eachB=rand(2,5);}
  const sizeB=pick([2,3,5]);const priceB=sizeB*eachB;
  const upA=priceA/sizeA, upB=priceB/sizeB;
  const better = upA<upB ? "Brand A" : (upB<upA?"Brand B":"Same");
  const choices=["Brand A","Brand B","Same"];
  return mcText("Brand A: "+sizeA+" for $"+priceA+". Brand B: "+sizeB+" for $"+priceB+". Which is the better buy (lower unit price)?",choices,better,"A = $"+upA+"/unit, B = $"+upB+"/unit. "+(better==="Same"?"Equal.":better+" is cheaper per unit."));
}
function h_threePartLargest(){
  // largest part: make sure the max ratio term, which may not be last
  const parts=shuffle([rand(2,4),rand(5,7),rand(1,3)]);
  const sum=parts[0]+parts[1]+parts[2];
  const unit=pick([2,3,4,5]);const total=sum*unit;
  const maxp=Math.max(parts[0],parts[1],parts[2]);
  return typed("$"+total+" is divided in the ratio "+parts[0]+":"+parts[1]+":"+parts[2]+". What is the LARGEST share (dollars)?",maxp*unit,"Parts total "+sum+". Each = $"+total+" ÷ "+sum+" = $"+unit+". Largest term is "+maxp+" → $"+(maxp*unit)+".");
}
function h_mapScale(){
  const scale=pick([10,20,25,50,5]);const mapCm=rand(2,8);
  return typed("On a map, 1 cm = "+scale+" km. Two towns are "+mapCm+" cm apart on the map. What is the real distance (km)?",scale*mapCm,mapCm+" cm × "+scale+" km/cm = "+(scale*mapCm)+" km.");
}
function h_reverseUnitRate(){
  const each=rand(3,9);const totalCost=pick([2,3,4,5,6])*each;const count=totalCost/each;
  return typed("Pencils cost $"+each+" each. You spend $"+totalCost+". How many pencils did you buy?",count,"$"+totalCost+" ÷ $"+each+" = "+count+" pencils.");
}
function h_proportionMissingFront(){
  const b=rand(2,8),c=rand(2,8),k=rand(2,6);
  // x/b = (c*k)/(b*k)? Use x/b = c/d with cross
  const d=b*k, num=c*k;
  return typed("Solve: x/"+b+" = "+num+"/"+d+"<br>x = ?",c,"x = "+b+" × "+num+" ÷ "+d+" = "+c+".");
}
function h_percentBackToBase(){
  // 30 is 25% of what?
  const pct=pick([10,20,25,50,5,40]);const base=pick([20,40,60,80,100,200]);
  const part=pct*base/100;
  return typed(part+" is "+pct+"% of what number?",base,part+" ÷ "+(pct/100)+" = "+base+".");
}
function h_recipeScaleDown(){
  const batches=pick([2,3,4]);const totalFlour=batches*pick([2,3,4]);const per=totalFlour/batches;
  return typed("A recipe for "+batches+" batches uses "+totalFlour+" cups of sugar. How many cups for ONE batch?",per,totalFlour+" ÷ "+batches+" = "+per+" cups.");
}

// ---------- CHALLENGING ----------
function c_successiveDiscount(){
  const base=pick([100,200,80,50,40]);const p1=pick([10,20,25,50]);const p2=pick([10,20,25,50]);
  const after1=base*(100-p1)/100;const final=after1*(100-p2)/100;
  return typed("A $"+base+" item gets "+p1+"% off, then "+p2+"% off the reduced price. Final price (dollars)?",final,"After "+p1+"% off: $"+after1+". Then "+p2+"% off: $"+after1+" × "+((100-p2)/100)+" = $"+final+".");
}
function c_reverseDiscount(){
  // sale price known, find original
  const orig=pick([40,60,80,100,120,200]);const pct=pick([10,20,25,50]);
  const sale=orig*(100-pct)/100;
  return typed("After a "+pct+"% discount, a coat costs $"+sale+". What was the original price (dollars)?",orig,"$"+sale+" is "+(100-pct)+"% of original. Original = $"+sale+" ÷ "+((100-pct)/100)+" = $"+orig+".");
}
function c_percentChangeFind(){
  // find the percent increase
  const old=pick([20,40,60,80,100,120]);const pct=pick([10,20,25,50,5]);
  const neu=old+old*pct/100;
  return typed("A price went from $"+old+" to $"+neu+". What was the percent increase?",pct,"Change = $"+(neu-old)+". Percent = "+(neu-old)+" ÷ "+old+" = "+fmt((neu-old)/old)+" = "+pct+"%.","Type a number (percent)");
}
function c_combinedRate(){
  // two workers combined per-hour
  const a=rand(2,6),b=rand(2,6);const hours=rand(2,5);
  return typed("Pump A fills "+a+" liters/min and Pump B fills "+b+" liters/min. Together, how many liters in "+hours+" minutes?",(a+b)*hours,"Combined rate = "+a+" + "+b+" = "+(a+b)+" L/min. × "+hours+" = "+((a+b)*hours)+" L.");
}
function c_threePartFindTotal(){
  const a=rand(1,3),b=rand(2,4),cc=rand(3,5);const unit=pick([3,4,5,6]);
  const smallest=Math.min(a,b,cc);const smallVal=smallest*unit;
  const total=(a+b+cc)*unit;
  return typed("Three friends share money in ratio "+a+":"+b+":"+cc+". The smallest share is $"+smallVal+". What is the TOTAL (dollars)?",total,"Smallest ratio term is "+smallest+", worth $"+smallVal+", so 1 part = $"+unit+". Total parts "+(a+b+cc)+" → $"+total+".");
}
function c_unitConversionRate(){
  // mph to miles in minutes
  const mph=pick([30,60,40,20,12,90]);const minutes=pick([10,20,30,15,5,45]);
  const miles=mph*minutes/60;
  return typed("A car goes "+mph+" mph. How many miles does it travel in "+minutes+" minutes?",miles,mph+" mph = "+mph+" miles per 60 min. "+minutes+"/60 × "+mph+" = "+miles+" miles.");
}
function c_tax(){
  const base=pick([20,40,50,80,200,60,100]);const pct=pick([5,10,8,25,20]);
  const tax=base*pct/100;
  return typed("A $"+base+" purchase has "+pct+"% sales tax. What is the total cost (dollars)?",base+tax,"Tax = "+pct+"% × $"+base+" = $"+tax+". Total = $"+(base+tax)+".");
}
function c_doubleProportion(){
  // scale recipe with two unknowns, ask one
  const eggsPer=rand(2,4);const flourPer=rand(2,5);const batches=rand(3,6);
  return typed("Each cake needs "+eggsPer+" eggs and "+flourPer+" cups of flour. For "+batches+" cakes, how many cups of flour are needed?",flourPer*batches,flourPer+" cups × "+batches+" cakes = "+(flourPer*batches)+" cups.");
}
function c_ratioOfChange(){
  // coprime ratio a:b with a<b, find larger from the difference
  const pairs=[[2,3],[2,5],[3,4],[3,5],[1,4],[4,5],[2,7],[3,7],[1,3],[5,6]];
  const p=pick(pairs);const a=p[0],b=p[1];
  const unit=pick([2,3,4,5]);
  const dv=(b-a)*unit;const bigger=b*unit;
  return typed("Two numbers are in the ratio "+a+":"+b+". Their difference is "+dv+". What is the LARGER number?",bigger,"Difference in parts = "+(b-a)+", worth "+dv+", so 1 part = "+unit+". Larger = "+b+" × "+unit+" = "+bigger+".");
}
function c_percentOfPercent(){
  const p1=pick([20,50,25,10,40]);const p2=pick([20,50,25,10,40]);const base=pick([100,200,400,80,40]);
  const inner=p1*base/100;const ans=p2*inner/100;
  return typed("What is "+p2+"% of "+p1+"% of "+base+"?",ans,p1+"% of "+base+" = "+inner+". "+p2+"% of "+inner+" = "+ans+".");
}
function c_betterBuyUnit(){
  const sizeA=pick([4,5,6]);const priceA=sizeA*rand(2,4);
  const sizeB=pick([3,8,10]);const priceB=sizeB*rand(2,4);
  const upA=priceA/sizeA, upB=priceB/sizeB;
  const cheaper=Math.min(upA,upB);
  return typed("Pack A: "+sizeA+" for $"+priceA+". Pack B: "+sizeB+" for $"+priceB+". What is the LOWER unit price (dollars per item)?",cheaper,"A: $"+upA+"/item, B: $"+upB+"/item. Lower = $"+cheaper+".");
}

const TIERS = [
  [m_writeRatio,m_simplifyRatio,m_equivRatio,m_unitRate,m_proportion,m_percentOf,m_whatPercent,m_unitRateThenMult,m_distRT,m_recipeScale,m_threePartTotal],
  [h_percentIncrease,h_percentDecrease,h_salePrice,h_solveProportionWords,h_betterBuy,h_threePartLargest,h_mapScale,h_reverseUnitRate,h_proportionMissingFront,h_percentBackToBase,h_recipeScaleDown],
  [c_successiveDiscount,c_reverseDiscount,c_percentChangeFind,c_combinedRate,c_threePartFindTotal,c_unitConversionRate,c_tax,c_doubleProportion,c_ratioOfChange,c_percentOfPercent,c_betterBuyUnit]
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
