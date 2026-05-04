// src/pages/HospitalsPage.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from '../components/LanguageSwitcher';

// 本地模拟数据（兜底用）
const mockHospitals = [
  { id: 1, name: '安安宠医（博格分院）', address: '江苏省苏州市太仓市郑和西路通洋花园1栋06室', price_range: '¥¥', phone: '0512-53519779', rating: 4.5, review_count: 320 },
  { id: 2, name: '安安宠医（人民南路分院）', address: '江苏省苏州市太仓市人民南路12号滨河花园12-11', price_range: '¥¥', phone: '0512-65722665', rating: 3.7, review_count: 150 },
  { id: 3, name: '暖馨动物医院', address: '江苏省苏州市太仓市郑和中路376号20幢商铺06室', price_range: '¥¥¥', phone: '0512-53570120', rating: 4.8, review_count: 450 },
  { id: 4, name: '新宠尚宠物医院（东仓南路店）', address: '江苏省苏州市太仓市东仓南路83-11号（加油站旁）', price_range: '¥¥', phone: '13773007788', rating: 3.8, review_count: 80 },
  { id: 5, name: '安瑞宠物医院', address: '江苏省苏州市太仓市浏河镇郑和东路68号6-7幢35号商铺', price_range: '¥¥', phone: '0512-53601199', rating: 4.6, review_count: 200 },
  { id: 6, name: '道格宠物医院', address: '江苏省苏州市太仓市城厢镇大庆锦绣新城雍景苑4幢商铺05室', price_range: '¥', phone: '15681296797', rating: 3.5, review_count: 60 },
  { id: 7, name: '瑞禾动物医院', address: '江苏省苏州市太仓市城厢镇县府街5号106室', price_range: '¥¥', phone: '15850170782', rating: 4.0, review_count: 90 },
  { id: 8, name: '太仓市畜牧兽医站', address: '江苏省苏州市太仓市太平路与县府东街交叉口县府东街4号', price_range: '¥', phone: '0512-53523451', rating: 3.9, review_count: 40 },
];

export default function HospitalsPage() {
    const { t } = useTranslation();
    const [hospitals, setHospitals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('comprehensive');

    useEffect(() => {
        fetchHospitals();
    }, []);

    async function fetchHospitals() {
        try {
            const { data, error } = await supabase.from('hospitals').select('*');
            if (error || !data || data.length === 0) {
                console.warn('Supabase 数据加载失败或为空，使用本地模拟数据');
                setHospitals(mockHospitals);
            } else {
                setHospitals(data);
            }
        } catch (err) {
            console.error('网络错误，使用本地模拟数据', err);
            setHospitals(mockHospitals);
        }
    }

    const filteredHospitals = hospitals
        .filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()) || h.address.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'price') {
                const priceVal = (p) => (p.price_range === '¥' ? 1 : p.price_range === '¥¥' ? 2 : 3);
                return priceVal(a) - priceVal(b);
            }
            return 0;
        });

    const openNavigation = (hospital) => {
        if (hospital.lat && hospital.lng) {
            window.open(`https://uri.amap.com/navigation?to=${hospital.lng},${hospital.lat}&mode=car&src=PetPro`, '_blank');
        } else if (hospital.address) {
            const encodedAddr = encodeURIComponent(hospital.address);
            window.open(`https://map.baidu.com/search/${encodedAddr}/@31.45,121.10,13z`, '_blank');
        } else alert('暂无位置信息');
    };

    const makePhoneCall = (phone) => {
        if (phone) window.location.href = `tel:${phone}`;
        else alert('暂无电话');
    };

    return (
        <div>
            <h1 className="font-display text-3xl font-black mb-1">{t('hospitalTitle')}</h1>
            <p className="text-sm text-ink-500 font-bold mb-4">{t('location', { count: hospitals.length })}</p>

            <div className="bg-white rounded-2xl px-4 py-3 mb-3 flex items-center gap-2 shadow-soft">
                <span className="text-ink-500">🔍</span>
                <input className="flex-1 outline-none text-sm font-bold bg-transparent" placeholder={t('searchPlaceholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                <button className={`chip ${sortBy === 'comprehensive' ? 'bg-orange-brand text-white' : 'bg-white text-ink-700 shadow-soft'} shrink-0`} onClick={() => setSortBy('comprehensive')}>{t('comprehensive')}</button>
                <button className={`chip ${sortBy === 'rating' ? 'bg-orange-brand text-white' : 'bg-white text-ink-700 shadow-soft'} shrink-0`} onClick={() => setSortBy('rating')}>{t('highestRating')}</button>
                <button className={`chip ${sortBy === 'price' ? 'bg-orange-brand text-white' : 'bg-white text-ink-700 shadow-soft'} shrink-0`} onClick={() => setSortBy('price')}>{t('lowestPrice')}</button>
            </div>

            <div className="space-y-3">
                {filteredHospitals.length === 0 && <div className="text-center text-ink-500 py-6">{t('noHospitals')}</div>}
                {filteredHospitals.map((h) => (
                    <div key={h.id} className="bg-white rounded-3xl p-4 shadow-card hover-lift">
                        <div className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mint-soft to-mint-brand flex items-center justify-center text-3xl shrink-0">🏥</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className="font-black text-base leading-tight">{h.name}</h3>
                                    <span className="chip bg-mint-soft text-mint-deep shrink-0">{t('certified')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-ink-700 mb-2">
                                    <span className="text-yellow-brand">{"★".repeat(Math.floor(h.rating))}</span>
                                    <span>{h.rating}</span>
                                    <span className="text-ink-300">·</span>
                                    <span>{h.review_count || 0} {t('reviews')}</span>
                                    <span className="text-ink-300">·</span>
                                    <span className="text-orange-deep">{h.price_range || '¥¥'}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                    <span className="chip bg-orange-soft text-orange-deep">{h.rating >= 4.5 ? '高评分' : '普通'}</span>
                                    <span className="chip bg-yellow-soft text-ink-900">{h.phone ? '可电话' : '暂无电话'}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-ink-500 font-bold truncate max-w-[150px]">📍 {h.address}</span>
                                    <div className="flex gap-2">
                                        {h.phone && <button onClick={() => makePhoneCall(h.phone)} className="text-blue-600 font-black text-xs bg-blue-50 px-2 py-1 rounded-full">{t('call')}</button>}
                                        <button onClick={() => openNavigation(h)} className="text-orange-deep font-black text-xs bg-orange-soft px-2 py-1 rounded-full">{t('navigate')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}