// ====================================================
// Supabase Configuration
// ====================================================
var SUPABASE_URL      = 'https://arpavayymvzckrytnwcr.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFycGF2YXl5bXZ6Y2tyeXRud2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMjEzMTIsImV4cCI6MjA5Nzc5NzMxMn0.KjnoR6fAWPVHJcuAol_mFbrXabzbY2G2itxrQmjWXBs';

// Use var not const — var allows re-declaration without SyntaxError
// This file always loads AFTER the Supabase CDN script tag
var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

var ALL_DEPARTMENTS = [
  'قسم العلاقات العامة والإعلام','دائرة الشؤون المالية','دائرة تقنية المعلومات والإحصاء',
  'دائرة الجودة وسلامة المرضى','دائرة التدريب والتطوير المهني','قسم الهندسة والصيانة',
  'قسم الخدمات العامة والنقليات','قسم الأمن والسلامة','قسم الصحة البيئية',
  'قسم المختبرات الطبية','قسم الأشعة والتصوير الطبي','قسم الصيدلة',
  'قسم العلاج الطبيعي','قسم التغذية العلاجية','قسم العلاج التنفسي',
  'قسم مكافحة العدوى','تمريض الحوادث والطوارئ','أطباء الحوادث والطوارئ',
  'أطباء الباطنية','قسم الأطفال','أطباء الأطفال','أطباء الجراحة العامة',
  'تمريض النساء والولادة','أطباء النساء والولادة','تمريض العناية',
  'أطباء التخدير','تمريض العمليات','تمريض العيادات الخارجية',
  'أطباء الجلدية','أطباء الأنف والأذن','أطباء العيون','قسم الصحة النفسية',
  'تمريض أمراض الكلى والغسيل الكلوي','أطباء أمراض الكلى والغسيل الكلوي',
  'أطباء العظام','تمريض النساء كبار','تمريض النساء والولادة 2',
  'تمريض الحضانة','تمريض صالة الولادة','تمريض الباطنية والجراحة',
];
