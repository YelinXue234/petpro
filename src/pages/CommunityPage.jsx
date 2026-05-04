import { useState } from 'react';
import { useTranslation } from '../components/LanguageSwitcher';

export default function CommunityPage({ user }) {
    const { t } = useTranslation();
    const currentUserId = user?.email?.split('@')[0] || '匿名用户';

    // ---------- 完整本地数据（10个主帖 + 所有回复）----------
    const [posts, setPosts] = useState([
        {
            id: 1001,
            user_id: '橘猫不吃橘',
            title: '真的不是所有橘猫都贪吃！',
            content: '真的不是所有橘猫都贪吃！我家这只对吃的一点都不积极，更爱趴着睡觉。昨天我剥了个橘子放桌上，它闻了一下直接嫌弃走开。大家家里的橘猫真的都像网上说的那么能吃吗？',
            likes: 35,
            create_time: '2023-11-15 09:23:00',
            replies: [
                { id: 1002, user_id: '铲屎官阿伟', content: '我家那只简直是吸尘器，只要是掉地上的东西不管能不能吃都先尝一口，太羡慕你家这只不贪吃的了！', likes: 12, create_time: '2023-11-15 09:45:00' },
                { id: 1003, user_id: '猫条批发商', content: '说明你家猫比较佛系呀，不过小时候不贪吃是好事，免得长大了发腮太猛得控制体重。', likes: 8, create_time: '2023-11-15 10:10:00' }
            ]
        },
        {
            id: 1004,
            user_id: '二哈拆家日记',
            title: '家人们，今天我又换沙发了',
            content: '家人们，今天我又换沙发了。第三套了！上一套布的被撕了，第二套皮的咬破了，今天这套科技布的目前存活2小时。兄弟们有没有什么真正防咬的沙发材质？别提关笼子，关了它就叫到邻居报警。',
            likes: 88,
            create_time: '2023-11-15 14:08:00',
            replies: [
                { id: 1005, user_id: '狗不理铲屎官', content: '放弃吧，在哈士奇眼里，沙发就是用来解体研究的。我现在的终极方案是买二手皮沙发套个粗布沙发罩，坏了直接换罩子。', likes: 45, create_time: '2023-11-15 14:30:00' },
                { id: 1006, user_id: '铲屎不如上班', content: '笑死，叫到邻居报警这段太有画面感了。建议你买个不锈钢椅子自己坐，把沙发让给二哈。', likes: 32, create_time: '2023-11-15 14:45:00' },
                { id: 1007, user_id: '训犬师老张', content: '拆家根本原因是精力没消耗完。每天早晚各跑个五公里，你看看它回来还有没有力气拆沙发？', likes: 18, create_time: '2023-11-15 15:20:00' }
            ]
        },
        {
            id: 1008,
            user_id: '布偶猫饲养员',
            title: '分享我家布偶的梳毛日常',
            content: '分享我家布偶的梳毛日常。不吹不黑，养布偶最大的工程就是梳毛。每天早晚各梳十五分钟，不然全打结。现在买了一堆梳子，感觉快成半个美容师了。大家家的长毛猫掉毛也这么恐怖吗？',
            likes: 42,
            create_time: '2023-11-16 10:15:00',
            replies: []
        },
        {
            id: 1009,
            user_id: '柯基小短腿儿',
            title: '小短腿也有大烦恼：下雨天出门简直绝了',
            content: '小短腿也有大烦恼：下雨天出门简直绝了。今天雨停了带它出去，地上全是水坑。别的狗跨过去，它直接肚子蹭一肚子泥……回来洗了半个多小时。有没有那种合适的防水小衣服推荐？最好是能护住肚子的。',
            likes: 67,
            create_time: '2023-11-16 15:22:00',
            replies: [
                { id: 1010, user_id: '上海浦东狗妈', content: '买那种带胸背一体的雨衣！分体式雨衣容易灌水，买连体带帽子的，肚子那边能扣扣子的那种，柯基穿上像个小坦克，超级管用。', likes: 25, create_time: '2023-11-16 16:00:00' },
                { id: 1011, user_id: '汪星驻地球大使', content: '短腿狗的痛谁懂，我家法斗也是，走快了肚子全在地上拖。我现在下雨天干脆不出去，在家里玩寻回游戏消耗体力算了。', likes: 14, create_time: '2023-11-16 16:30:00' }
            ]
        },
        {
            id: 1012,
            user_id: '执业兽医小王',
            title: '猫咪打喷嚏不一定是感冒',
            content: '科普一下：猫咪打喷嚏不一定是感冒。最近门诊遇到好多因为猫咪打喷嚏就来买感冒药的家长。其实猫咪打喷嚏原因很多：猫砂粉尘大、空气干燥、甚至一些刺激性气味都会引起。如果只是偶尔打，精神食欲正常，千万别乱喂人用药！',
            likes: 156,
            create_time: '2023-11-17 09:30:00',
            replies: [
                { id: 1013, user_id: '新手铲屎官求助', content: '天呐，前两天我家猫打了两个喷嚏我差点就去药箱翻感冒灵了，还好忍住了。那医生，用什么猫砂粉尘会比较小呀？', likes: 22, create_time: '2023-11-17 10:15:00' },
                { id: 1014, user_id: '宠物营养师Luna', content: '王医生说得对，补充一下，如果是新换了环境或者新买了香水、消毒液，也容易引起猫咪打喷嚏，排查一下环境因素很重要。', likes: 35, create_time: '2023-11-17 10:45:00' }
            ]
        },
        {
            id: 1015,
            user_id: '午后阳光与猫',
            title: '今日份的安静陪伴',
            content: '今日份的安静陪伴。外面下着小雨，猫咪趴在窗台上看雨发呆，阳光偶尔从云缝里透出来打在它身上。泡了杯茶坐在旁边，什么都不想，觉得生活真好。',
            likes: 78,
            create_time: '2023-11-19 15:40:00',
            replies: []
        },
        {
            id: 1016,
            user_id: '我家猫会后空翻',
            title: '拍到了！绝了兄弟们！！',
            content: '拍到了！绝了兄弟们！！刚才拿逗猫棒逗它，它为了够那个羽毛直接在空中翻了个圈！虽然落地有点踉跄但我用视频慢动作确认了确实是后空翻！这猫我能送去马戏团了吧😹',
            likes: 102,
            create_time: '2023-11-18 20:45:00',
            replies: [
                { id: 1017, user_id: '被宠物支配的一生', content: '快发视频快发视频！我家的别说后空翻了，平时逗它玩超过五分钟它就躺地上翻白眼让我滚，差距怎么这么大。', likes: 28, create_time: '2023-11-18 21:00:00' },
                { id: 1018, user_id: '半夜被猫踩醒', content: '你那叫后空翻，我家半夜三点跑酷那叫跑酷，每次都精准踩在我肚子上借力起飞，我才是马戏团里的垫脚石。', likes: 41, create_time: '2023-11-18 21:15:00' }
            ]
        },
        {
            id: 1019,
            user_id: '独居女生与猫',
            title: '生病时才发现养猫真好',
            content: '今天发烧39度，一个人在家躺着，本来觉得特别委屈。结果我家猫一整天都没怎么闹，就乖乖趴在我枕头旁边，偶尔拿小脑袋蹭蹭我手。那一刻觉得，养猫真的挺好的。',
            likes: 189,
            create_time: '2023-11-20 11:30:00',
            replies: [
                { id: 1020, user_id: '治愈系养宠人', content: '看哭了，小动物其实什么都知道的，它能感知到你不舒服。赶紧喝点热水吃点药，好好休息呀抱抱。', likes: 45, create_time: '2023-11-20 11:45:00' },
                { id: 1021, user_id: '温柔以待小生命', content: '这就是为什么那么多人离不开猫的原因吧，在你最脆弱的时候，这种无声的陪伴比什么都管用。早日康复哦！', likes: 38, create_time: '2023-11-20 12:00:00' },
                { id: 1022, user_id: '北京朝阳养猫人', content: '生病了记得点个外卖，别硬扛。我上次阳了也是猫陪着，它平时上蹿下跳的，那天就安静地守着我。', likes: 15, create_time: '2023-11-20 12:20:00' }
            ]
        },
        {
            id: 1023,
            user_id: '流浪猫救助站老李',
            title: '入冬了，救助站物资告急',
            content: '入冬了，救助站物资又开始紧张了。这几天降温，又收容了七八只被冻得发抖的小猫。猫砂、猫粮消耗量翻倍，如果有附近的朋友家里有不用的旧毛毯、旧衣服，洗干净了能捐给我们就太感谢了。',
            likes: 65,
            create_time: '2023-11-21 08:15:00',
            replies: []
        },
        {
            id: 1024,
            user_id: '大学生宿舍养仓鼠',
            title: '救大命，仓鼠越狱了！',
            content: '救大命，我偷偷养在宿舍的仓鼠越狱了！昨晚发现笼子门被咬开，找了一晚上没找到。今天把舍友的抽屉、床底都翻遍了还是没有。它会不会从门缝跑出去了？还是死在哪个死角了？我不敢跟舍友说，急死了在线等！',
            likes: 54,
            create_time: '2023-11-22 22:30:00',
            replies: [
                { id: 1025, user_id: '仓鼠球滚滚', content: '别慌，仓鼠不会轻易跑出房间的，它们胆子很小的。你晚上关了灯，拿个手电筒在地上照，如果它跑出来找吃的，眼睛会反光，很容易发现。', likes: 20, create_time: '2023-11-22 22:45:00' }
            ]
        }
    ]);

    // UI 状态
    const [expandedReplies, setExpandedReplies] = useState({});
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostTitle, setNewPostTitle] = useState('');

    // 点赞处理
    const handleLike = (postId, isReply = false, parentId = null, replyId = null) => {
        if (!user) {
            alert(t('pleaseLogin') || '请先登录');
            return;
        }
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === postId && !isReply) {
                    return { ...post, likes: post.likes + 1 };
                } else if (isReply && parentId === post.id) {
                    const newReplies = post.replies.map(reply => {
                        if (reply.id === replyId) {
                            return { ...reply, likes: reply.likes + 1 };
                        }
                        return reply;
                    });
                    return { ...post, replies: newReplies };
                }
                return post;
            });
        });
    };

    // 发布新帖子
    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!user) return alert(t('pleaseLogin') || '请先登录');
        if (!newPostContent.trim()) return alert(t('contentRequired') || '内容不能为空');
        const newId = Date.now();
        const newPost = {
            id: newId,
            user_id: currentUserId,
            title: newPostTitle.slice(0, 50) || newPostContent.slice(0, 30),
            content: newPostContent,
            likes: 0,
            create_time: new Date().toLocaleString(),
            replies: []
        };
        setPosts(prev => [newPost, ...prev]);
        setNewPostTitle('');
        setNewPostContent('');
    };

    // 回复帖子
    const handleReply = (parentId) => {
        if (!user) return alert(t('pleaseLogin') || '请先登录');
        if (!replyContent.trim()) return alert(t('contentRequired') || '回复内容不能为空');
        const newReplyId = Date.now();
        const newReply = {
            id: newReplyId,
            user_id: currentUserId,
            content: replyContent,
            likes: 0,
            create_time: new Date().toLocaleString()
        };
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === parentId) {
                    return { ...post, replies: [...post.replies, newReply] };
                }
                return post;
            });
        });
        setReplyingTo(null);
        setReplyContent('');
    };

    const toggleReplies = (postId) => {
        setExpandedReplies(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    return (
        <div>
            <h1 className="font-display text-3xl font-black mb-2">{t('communityTitle')}</h1>
            <p className="text-sm text-ink-500 font-bold mb-4">{t('onlineCount')}</p>

            {user && (
                <div className="bg-white rounded-3xl p-4 shadow-soft mb-6">
                    <input
                        type="text"
                        className="w-full border border-ink-300 rounded-2xl p-2 text-sm mb-2 focus:outline-none focus:border-orange-brand"
                        placeholder={t('postTitle') || '标题（可选）'}
                        value={newPostTitle}
                        onChange={e => setNewPostTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full border border-ink-300 rounded-2xl p-3 text-sm focus:outline-none focus:border-orange-brand resize-none"
                        rows="3"
                        placeholder={t('shareContent') || '分享你的养宠日常、求助或经验...'}
                        value={newPostContent}
                        onChange={e => setNewPostContent(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                        <button onClick={handleCreatePost} className="btn-primary px-5 py-2 rounded-xl text-sm">{t('sharePost')}</button>
                    </div>
                </div>
            )}

            <div className="space-y-5">
                {posts.map(post => (
                    <div key={post.id} className="bg-white rounded-3xl shadow-soft overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-soft to-yellow-soft flex items-center justify-center text-xl shrink-0">🐾</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-black text-sm">{post.user_id}</span>
                                        <span className="text-xs text-ink-500">· {post.create_time}</span>
                                    </div>
                                    {post.title && <p className="font-extrabold text-base mt-1">{post.title}</p>}
                                    <p className="text-gray-700 text-sm mt-2 whitespace-pre-wrap">{post.content}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-ink-300/20">
                                <div className="flex gap-5">
                                    <button onClick={() => handleLike(post.id, false)} className="flex items-center gap-1 text-sm text-ink-500">
                                        ❤️ {post.likes}
                                    </button>
                                    <button onClick={() => toggleReplies(post.id)} className="flex items-center gap-1 text-sm text-ink-500">
                                        💬 {post.replies.length} {t('replies')}
                                    </button>
                                </div>
                                <button onClick={() => setReplyingTo(post.id)} className="text-xs text-orange-deep font-black">{t('reply')}</button>
                            </div>

                            {expandedReplies[post.id] && (
                                <div className="mt-4 pl-4 border-l-2 border-orange-soft space-y-3">
                                    {post.replies.map(reply => (
                                        <div key={reply.id} className="bg-cream rounded-2xl p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-black text-xs">{reply.user_id}</span>
                                                <span className="text-[10px] text-ink-500">{reply.create_time}</span>
                                            </div>
                                            <p className="text-sm">{reply.content}</p>
                                            <button onClick={() => handleLike(post.id, true, post.id, reply.id)} className="text-xs text-ink-500 mt-1">
                                                ❤️ {reply.likes}
                                            </button>
                                        </div>
                                    ))}
                                    {post.replies.length === 0 && (
                                        <p className="text-xs text-ink-500">{t('noReplies')}</p>
                                    )}
                                </div>
                            )}

                            {replyingTo === post.id && (
                                <div className="mt-3 pt-3 border-t border-ink-300/20">
                                    <textarea
                                        className="w-full border border-ink-300 rounded-xl p-2 text-sm focus:outline-none focus:border-orange-brand resize-none"
                                        rows="2"
                                        placeholder={t('reply')}
                                        value={replyContent}
                                        onChange={e => setReplyContent(e.target.value)}
                                    />
                                    <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={() => setReplyingTo(null)} className="text-xs text-ink-500">{t('cancel')}</button>
                                        <button onClick={() => handleReply(post.id)} className="btn-primary px-4 py-1 rounded-lg text-xs">{t('send')}</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}