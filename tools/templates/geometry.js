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
  /* ===================== MEDIUM (grade-6) ===================== */
  [
    // 1. Rectangle area
    function(){
      const w=rand(4,15), h=rand(3,12);
      const a=w*h;
      return typed("A rectangle is "+w+" cm wide and "+h+" cm tall. What is its area in cm²?",
        a, "Area = width × height = "+w+" × "+h+" = "+a+" cm².");
    },
    // 2. Rectangle perimeter
    function(){
      const w=rand(5,18), h=rand(3,16);
      const p=2*(w+h);
      return typed("A rectangle is "+w+" m long and "+h+" m wide. What is its perimeter in m?",
        p, "Perimeter = 2(length + width) = 2("+w+" + "+h+") = 2 × "+(w+h)+" = "+p+" m.");
    },
    // 3. Square area
    function(){
      const s=rand(3,15);
      const a=s*s;
      return typed("A square has side length "+s+" in. What is its area in in²?",
        a, "Area of a square = side² = "+s+"² = "+a+" in².");
    },
    // 4. Square perimeter
    function(){
      const s=rand(4,20);
      const p=4*s;
      return typed("A square has side length "+s+" cm. What is its perimeter in cm?",
        p, "Perimeter of a square = 4 × side = 4 × "+s+" = "+p+" cm.");
    },
    // 5. Triangle area (1/2 b h) with even product
    function(){
      const b=rand(3,16);
      let h=rand(2,14);
      while((b*h)%2!==0) h++;
      const a=b*h/2;
      return typed("A triangle has base "+b+" cm and height "+h+" cm. What is its area in cm²?",
        a, "Area = ½ × base × height = ½ × "+b+" × "+h+" = "+a+" cm².");
    },
    // 6. Parallelogram area
    function(){
      const b=rand(4,15), h=rand(3,12);
      const a=b*h;
      return typed("A parallelogram has base "+b+" m and height "+h+" m. What is its area in m²?",
        a, "Area of a parallelogram = base × height = "+b+" × "+h+" = "+a+" m².");
    },
    // 7. Volume of a box
    function(){
      const l=rand(2,8), w=rand(2,7), h=rand(2,6);
      const v=l*w*h;
      return typed("A box is "+l+" cm by "+w+" cm by "+h+" cm. What is its volume in cm³?",
        v, "Volume = length × width × height = "+l+" × "+w+" × "+h+" = "+v+" cm³.");
    },
    // 8. Volume of a cube
    function(){
      const s=rand(2,9);
      const v=s*s*s;
      return typed("A cube has edge length "+s+" cm. What is its volume in cm³?",
        v, "Volume of a cube = edge³ = "+s+"³ = "+v+" cm³.");
    },
    // 9. Complementary angles
    function(){
      const a=rand(15,75);
      const b=90-a;
      return typed("Two angles are complementary. One angle measures "+a+"°. What is the other angle in degrees?",
        b, "Complementary angles add to 90°. 90° − "+a+"° = "+b+"°.");
    },
    // 10. Supplementary angles
    function(){
      const a=rand(20,160);
      const b=180-a;
      return typed("Two angles are supplementary. One angle measures "+a+"°. What is the other angle in degrees?",
        b, "Supplementary angles add to 180°. 180° − "+a+"° = "+b+"°.");
    },
    // 11. Triangle angle sum (find 3rd)
    function(){
      const a=rand(30,80);
      let b=rand(30,80);
      while(a+b>150) b=rand(30,80);
      const c=180-a-b;
      return typed("Two angles of a triangle measure "+a+"° and "+b+"°. What is the third angle in degrees?",
        c, "Angles of a triangle add to 180°. 180° − "+a+"° − "+b+"° = "+c+"°.");
    },
    // 12. Missing dimension (area & one side)
    function(){
      const w=rand(3,14), other=rand(4,12);
      const a=w*other;
      return typed("A rectangle has area "+a+" cm² and a width of "+w+" cm. What is its length in cm?",
        other, "Length = area ÷ width = "+a+" ÷ "+w+" = "+other+" cm.");
    },
    // 13. Square area from grid count (perimeter of square)
    function(){
      const s=pick([4,6,8,9,10,12,16]); // perfect-square-friendly
      const a=s*s;
      return typed("A square has area "+a+" cm². What is the length of one side in cm?",
        s, "Side = √area = √"+a+" = "+s+" cm (since "+s+" × "+s+" = "+a+").");
    },
  ],

  /* ===================== HARD (placement bar) ===================== */
  [
    // 1. Trapezoid area
    function(){
      const b1=rand(4,12);
      let b2=rand(4,14);
      while(b2===b1) b2=rand(4,14);
      let h=rand(3,12);
      while(((b1+b2)*h)%2!==0) h++;
      const a=(b1+b2)*h/2;
      return typed("A trapezoid has parallel sides "+b1+" cm and "+b2+" cm, and a height of "+h+" cm. What is its area in cm²?",
        a, "Area = ½ × (b₁ + b₂) × h = ½ × ("+b1+" + "+b2+") × "+h+" = ½ × "+(b1+b2)+" × "+h+" = "+a+" cm².");
    },
    // 2. Circle area (radius, clean)
    function(){
      const r=pick([2,3,4,5,6,10]);
      const a=3.14*r*r;
      return typed("A circle has radius "+r+" cm. What is its area in cm²? (use π ≈ 3.14)",
        fmt(a), "Area = πr² ≈ 3.14 × "+r+"² = 3.14 × "+(r*r)+" = "+fmt(a)+" cm².");
    },
    // 3. Circle circumference (radius)
    function(){
      const r=pick([2,3,4,5,7,10]);
      const c=2*3.14*r;
      return typed("A circle has radius "+r+" cm. What is its circumference in cm? (use π ≈ 3.14)",
        fmt(c), "Circumference = 2πr ≈ 2 × 3.14 × "+r+" = "+fmt(c)+" cm.");
    },
    // 4. Area/circumference given diameter
    function(){
      const d=pick([4,6,8,10,12,20]);
      const c=3.14*d;
      return typed("A circle has diameter "+d+" cm. What is its circumference in cm? (use π ≈ 3.14)",
        fmt(c), "Circumference = πd ≈ 3.14 × "+d+" = "+fmt(c)+" cm.");
    },
    // 5. Area given diameter
    function(){
      const d=pick([4,6,8,10,12,20]);
      const r=d/2;
      const a=3.14*r*r;
      return typed("A circle has diameter "+d+" cm. What is its area in cm²? (use π ≈ 3.14)",
        fmt(a), "Radius = d ÷ 2 = "+r+" cm. Area = πr² ≈ 3.14 × "+r+"² = 3.14 × "+(r*r)+" = "+fmt(a)+" cm².");
    },
    // 6. Surface area of a box
    function(){
      const l=rand(2,8), w=rand(2,7), h=rand(2,6);
      const sa=2*(l*w+l*h+w*h);
      return typed("A box is "+l+" cm by "+w+" cm by "+h+" cm. What is its total surface area in cm²?",
        sa, "Surface area = 2(lw + lh + wh) = 2("+(l*w)+" + "+(l*h)+" + "+(w*h)+") = 2 × "+(l*w+l*h+w*h)+" = "+sa+" cm².");
    },
    // 7. Angles in a ratio (two parts, of 90 or 180)
    function(){
      const total=pick([90,180]);
      const parts=pick([[1,2],[1,3],[2,3],[1,4],[3,2],[1,5],[4,5]]);
      const sum=parts[0]+parts[1];
      while(total%sum!==0){ // re-pick safe combo
        return (function(){
          const t=180; const p=[1,2]; const s=3; const unit=t/s;
          const ans=unit*p[1];
          return typed("Two angles are in the ratio "+p[0]+":"+p[1]+" and together form a straight angle (180°). What is the larger angle in degrees?",
            ans, "Total parts = "+p[0]+" + "+p[1]+" = "+s+". Each part = 180° ÷ "+s+" = "+unit+"°. Larger = "+p[1]+" × "+unit+"° = "+ans+"°.");
        })();
      }
      const unit=total/sum;
      const larger=Math.max(parts[0],parts[1])*unit;
      const word=total===90?"a right angle (90°)":"a straight angle (180°)";
      return typed("Two angles are in the ratio "+parts[0]+":"+parts[1]+" and together form "+word+". What is the larger angle in degrees?",
        larger, "Total parts = "+parts[0]+" + "+parts[1]+" = "+sum+". Each part = "+total+"° ÷ "+sum+" = "+unit+"°. Larger = "+Math.max(parts[0],parts[1])+" × "+unit+"° = "+larger+"°.");
    },
    // 8. Compound L-shape area (big rect minus corner rect)
    function(){
      const W=rand(8,14), H=rand(6,11);
      const cw=rand(2,W-3), ch=rand(2,H-3);
      const a=W*H-cw*ch;
      return typed("An L-shape is made by cutting a "+cw+" by "+ch+" rectangle out of one corner of a "+W+" by "+H+" rectangle. What is the area of the L-shape?",
        a, "Big area = "+W+" × "+H+" = "+(W*H)+". Cut area = "+cw+" × "+ch+" = "+(cw*ch)+". L-shape = "+(W*H)+" − "+(cw*ch)+" = "+a+".");
    },
    // 9. Perimeter of a square from area
    function(){
      const s=pick([3,5,6,7,8,9,11,12]);
      const a=s*s;
      const p=4*s;
      return typed("A square has area "+a+" cm². What is its perimeter in cm?",
        p, "Side = √"+a+" = "+s+" cm. Perimeter = 4 × "+s+" = "+p+" cm.");
    },
    // 10. Area of rectangle on a coordinate grid
    function(){
      const x1=rand(-4,3), y1=rand(-4,3);
      const w=rand(2,7), h=rand(2,7);
      const x2=x1+w, y2=y1+h;
      const a=w*h;
      return typed("A rectangle on a coordinate grid has corners ("+x1+", "+y1+"), ("+x2+", "+y1+"), ("+x2+", "+y2+"), and ("+x1+", "+y2+"). What is its area?",
        a, "Width = "+x2+" − ("+x1+") = "+w+". Height = "+y2+" − ("+y1+") = "+h+". Area = "+w+" × "+h+" = "+a+".");
    },
    // 11. Triangle: find base given area and height
    function(){
      const b=rand(4,16);
      let h=rand(3,12);
      while((b*h)%2!==0) h++;
      const a=b*h/2;
      return typed("A triangle has area "+a+" cm² and height "+h+" cm. What is its base in cm?",
        b, "Area = ½ × base × height, so base = (2 × area) ÷ height = (2 × "+a+") ÷ "+h+" = "+(2*a)+" ÷ "+h+" = "+b+" cm.");
    },
    // 12. Missing edge of box given volume and two edges
    function(){
      const l=rand(2,8), w=rand(2,7), h=rand(2,6);
      const v=l*w*h;
      return typed("A box has volume "+v+" cm³. Its length is "+l+" cm and its width is "+w+" cm. What is its height in cm?",
        h, "Height = volume ÷ (length × width) = "+v+" ÷ ("+l+" × "+w+") = "+v+" ÷ "+(l*w)+" = "+h+" cm.");
    },
    // 13. Radius from circumference (clean, π=3.14 cancels via divide)
    function(){
      const r=pick([2,3,4,5,6,10]);
      const c=fmt(2*3.14*r);
      return typed("A circle has circumference "+c+" cm. What is its radius in cm? (use π ≈ 3.14)",
        r, "Circumference = 2πr, so r = C ÷ (2π) = "+c+" ÷ 6.28 = "+r+" cm.");
    },
  ],

  /* ===================== CHALLENGING (beyond test) ===================== */
  [
    // 1. Shaded region: square minus inscribed-ish circle (use big square minus circle)
    function(){
      const r=pick([2,3,4,5,6,7,10]);
      const side=2*r;
      const a=side*side-3.14*r*r;
      return typed("A circle of radius "+r+" cm is inscribed in a square (the circle touches all four sides). What is the area inside the square but outside the circle, in cm²? (use π ≈ 3.14)",
        fmt(a), "Square side = 2r = "+side+" cm, area = "+(side*side)+" cm². Circle area = 3.14 × "+r+"² = "+fmt(3.14*r*r)+" cm². Shaded = "+(side*side)+" − "+fmt(3.14*r*r)+" = "+fmt(a)+" cm².");
    },
    // 2. Two complementary angles via expression
    function(){
      const x=rand(10,35);
      const small=x, big=90-x; // angle and its complement, but phrased as x and (x+k)
      const k=big-small; // could be negative; ensure positive by construction
      // Build: one angle is k more than the other, complementary
      const diff=2*rand(4,20); // even
      const a=(90-diff)/2; // smaller, ensure positive integer
      if(a<=0||!Number.isInteger(a)) return TIERS[2][0]();
      const bigger=a+diff;
      return typed("Two complementary angles differ by "+diff+"°. What is the measure of the larger angle in degrees?",
        bigger, "Let the smaller be x. Then x + (x + "+diff+") = 90, so 2x = "+(90-diff)+", x = "+a+"°. Larger = "+a+" + "+diff+" = "+bigger+"°.");
    },
    // 3. Surface area of a cube from volume
    function(){
      const s=pick([2,3,4,5,6,7,8,9,10]);
      const v=s*s*s;
      const sa=6*s*s;
      return typed("A cube has volume "+v+" cm³. What is its total surface area in cm²?",
        sa, "Edge = ∛"+v+" = "+s+" cm. Surface area = 6 × edge² = 6 × "+(s*s)+" = "+sa+" cm².");
    },
    // 4. Composite: rectangle + triangle (house pentagon)
    function(){
      const w=rand(4,10);
      const rh=rand(3,8);
      let th=rand(2,8);
      while((w*th)%2!==0) th++;
      const a=w*rh + w*th/2;
      return typed("A pentagon shaped like a house is a "+w+" by "+rh+" rectangle with a triangle of height "+th+" on top (the triangle's base equals the rectangle's width, "+w+"). What is the total area?",
        a, "Rectangle = "+w+" × "+rh+" = "+(w*rh)+". Triangle = ½ × "+w+" × "+th+" = "+(w*th/2)+". Total = "+(w*rh)+" + "+(w*th/2)+" = "+a+".");
    },
    // 5. Three angles in a ratio summing to 180 (triangle)
    function(){
      const parts=pick([[1,2,3],[2,3,4],[1,3,5],[2,2,5],[1,1,4],[3,4,5]]);
      const sum=parts[0]+parts[1]+parts[2];
      if(180%sum!==0) return TIERS[2][4]();
      const unit=180/sum;
      const largest=Math.max(...parts)*unit;
      return typed("The three angles of a triangle are in the ratio "+parts[0]+":"+parts[1]+":"+parts[2]+". What is the largest angle in degrees?",
        largest, "Total parts = "+parts[0]+" + "+parts[1]+" + "+parts[2]+" = "+sum+". Each part = 180° ÷ "+sum+" = "+unit+"°. Largest = "+Math.max(...parts)+" × "+unit+"° = "+largest+"°.");
    },
    // 6. Perimeter of L-shape
    function(){
      const W=rand(8,14), H=rand(6,11);
      const cw=rand(2,W-3), ch=rand(2,H-3);
      // L-shape (corner removed): perimeter equals outer rectangle perimeter (notch adds same length)
      const p=2*(W+H);
      return typed("An L-shape is formed by removing a "+cw+" by "+ch+" rectangle from one corner of a "+W+" by "+H+" rectangle. What is the perimeter of the L-shape?",
        p, "Removing a corner notch keeps the perimeter equal to the original rectangle: the two cut edges replace the two outer edges of equal total length. Perimeter = 2("+W+" + "+H+") = "+p+".");
    },
    // 7. Volume of box scaled (doubling effect) MC
    function(){
      const l=rand(2,5), w=rand(2,5), h=rand(2,5);
      const v=l*w*h;
      const nv=8*v; // all edges doubled
      return mcNum("A box has volume "+v+" cm³. If every edge length is doubled, what is the new volume in cm³?",
        nv, [2*v,4*v,v+8], "Doubling each of the 3 edges multiplies volume by 2×2×2 = 8. New volume = 8 × "+v+" = "+nv+" cm³.");
    },
    // 8. Area between two concentric circles (ring)
    function(){
      const R=pick([4,5,6,10]);
      let r=pick([2,3]);
      while(r>=R) r=pick([2,3]);
      const a=3.14*(R*R-r*r);
      return typed("Two circles share the same center. The outer radius is "+R+" cm and the inner radius is "+r+" cm. What is the area of the ring between them in cm²? (use π ≈ 3.14)",
        fmt(a), "Ring area = πR² − πr² = 3.14 × ("+R+"² − "+r+"²) = 3.14 × ("+(R*R)+" − "+(r*r)+") = 3.14 × "+(R*R-r*r)+" = "+fmt(a)+" cm².");
    },
    // 9. Number of small cubes / unit cubes filling box
    function(){
      const l=rand(4,9), w=rand(2,6), h=rand(2,6);
      const edge=pick([2]);
      // ensure divisibility
      const L=l*edge, W=w*edge, H=h*edge; // dims chosen so edge divides
      const count=l*w*h;
      return typed("How many "+edge+"-cm cubes are needed to completely fill a box that is "+L+" cm by "+W+" cm by "+H+" cm?",
        count, "Along each side: "+L+"÷"+edge+"="+l+", "+W+"÷"+edge+"="+w+", "+H+"÷"+edge+"="+h+". Total cubes = "+l+" × "+w+" × "+h+" = "+count+".");
    },
    // 10. Exterior/remaining angle: straight line with two known angles
    function(){
      const a=rand(30,80);
      let b=rand(30,80);
      while(a+b>=175) b=rand(30,70);
      const c=180-a-b;
      return typed("Three angles meet along a straight line and together form a straight angle (180°). Two of them measure "+a+"° and "+b+"°. What is the third angle in degrees?",
        c, "Angles on a straight line add to 180°. 180° − "+a+"° − "+b+"° = "+c+"°.");
    },
    // 11. Effect of doubling radius on circle area (MC)
    function(){
      const r=pick([2,3,4,5,6,7,8,10]);
      const a=3.14*r*r;
      const na=3.14*(2*r)*(2*r);
      return mcText("A circle has area "+fmt(a)+" cm². If the radius is doubled, the new area is...",
        [fmt(2*a),fmt(4*a),fmt(a),fmt(8*a)], fmt(4*a),
        "Doubling the radius multiplies the area by 2² = 4. New area = 4 × "+fmt(a)+" = "+fmt(4*a)+" cm².");
    },
    // 12. Rhombus area from diagonals
    function(){
      let d1=rand(4,16), d2=rand(4,16);
      while((d1*d2)%2!==0) d2++;
      const a=d1*d2/2;
      return typed("A rhombus has diagonals of length "+d1+" cm and "+d2+" cm. What is its area in cm²?",
        a, "Area of a rhombus = ½ × d₁ × d₂ = ½ × "+d1+" × "+d2+" = "+a+" cm².");
    },
    // 13. Total surface area of cube vs cost / scaling MC isn't; do: find side of square given perimeter & compare area
    function(){
      const p=pick([12,16,20,24,28,32,36,40]);
      const s=p/4;
      const a=s*s;
      return typed("A square has perimeter "+p+" cm. What is its area in cm²?",
        a, "Side = perimeter ÷ 4 = "+p+" ÷ 4 = "+s+" cm. Area = "+s+"² = "+a+" cm².");
    },
  ],
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
