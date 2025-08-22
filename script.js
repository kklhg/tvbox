// 更新当前时间
function updateTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = now.getHours() >= 12 ? 'PM' : 'AM';
    document.getElementById('current-time').textContent = `${hours}:${minutes} ${period}`;
}

// 初始化时间并定时更新
updateTime();
setInterval(updateTime, 60000);

// 频道数据
const channelData = {
    1: { name: "News Channel", info: "Latest headlines and breaking news around the world" },
    2: { name: "Sports Network", info: "Live sports coverage and analysis" },
    3: { name: "Movie Theater", info: "Classic and new release films" },
    4: { name: "Kids Zone", info: "Educational programs and cartoons for children" },
    5: { name: "Music Factory", info: "Music videos and live performances" },
    6: { name: "Documentary Channel", info: "Informative programs about nature, history and science" },
    7: { name: "Sports Extra", info: "Additional sports coverage and highlights" },
    8: { name: "Shopping Network", info: "Home shopping with exclusive deals" }
};

// 频道选择功能
document.querySelectorAll('.channel-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        // 移除所有选中状态
        document.querySelectorAll('.channel-icon').forEach(i => {
            i.classList.remove('ring-2', 'ring-white');
        });
        
        // 添加选中状态
        icon.classList.add('ring-2', 'ring-white');
        
        // 获取频道号并更新信息
        const channelNumber = icon.querySelector('.channel-number').textContent;
        const channelInfo = channelData[channelNumber];
        
        document.getElementById('selected-channel-name').textContent = channelInfo.name;
        document.getElementById('selected-channel-info').textContent = channelInfo.info;
        
        // 播放频道切换动画
        playChannelSwitchEffect();
    });
});

// 频道切换效果
function playChannelSwitchEffect() {
    const screen = document.querySelector('.screen-glow');
    screen.classList.add('bg-gray-900');
    
    setTimeout(() => {
        screen.classList.remove('bg-gray-900');
    }, 100);
}

// 音量旋钮交互
const volumeKnob = document.querySelector('.volume-knob');
let isDragging = false;
let startX, startLeft;

volumeKnob.addEventListener('mousedown', startDrag);
volumeKnob.addEventListener('touchstart', startDrag, { passive: true });

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', drag, { passive: true });

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    startLeft = parseInt(window.getComputedStyle(volumeKnob).left);
    volumeKnob.classList.add('scale-125');
}

function drag(e) {
    if (!isDragging) return;
    
    const volumeControl = document.querySelector('.volume-control .w-16');
    const controlWidth = volumeControl.offsetWidth;
    const knobWidth = volumeKnob.offsetWidth;
    
    let clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    let diffX = clientX - startX;
    let newLeft = startLeft + diffX;
    
    // 限制旋钮在音量控制条内
    newLeft = Math.max(0, Math.min(newLeft, controlWidth - knobWidth));
    
    volumeKnob.style.left = newLeft + 'px';
}

function endDrag() {
    isDragging = false;
    volumeKnob.classList.remove('scale-125');
}

// 随机信号干扰效果
setInterval(() => {
    if (Math.random() > 0.85) {
        const allChannels = document.querySelectorAll('.channel-icon');
        const randomChannel = allChannels[Math.floor(Math.random() * allChannels.length)];
        
        randomChannel.classList.add('opacity-70');
        setTimeout(() => {
            randomChannel.classList.remove('opacity-70');
        }, 100);
    }
}, 5000);

// 电视开机效果
window.addEventListener('load', () => {
    const screen = document.querySelector('.screen-glow');
    screen.style.opacity = '0';
    
    setTimeout(() => {
        screen.style.transition = 'opacity 1s ease';
        screen.style.opacity = '1';
    }, 300);
});
