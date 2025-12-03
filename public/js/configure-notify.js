function getNotify(title, text, type, position, duration){
    new Notify({
        status: type,
        title: title,
        text: text,
        effect: 'fade',
        speed: 500,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: duration,
        gap:20,
        distance: 20,
        type: 1,
        position: position
    });
}