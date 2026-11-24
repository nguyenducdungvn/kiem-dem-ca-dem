/* =========================================================
   Thẻ minh họa cho từng kết thúc (SVG vẽ tay bằng code, 64×64).
   Dùng trong Bộ sưu tập kết thúc và màn hình kết thúc.
   ========================================================= */
(function () {
  'use strict';
  const S = 'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"';
  const D = {
    wall: `<g ${S}><rect x="8" y="12" width="48" height="40"/><path d="M8 22h48M8 32h48M8 42h48M20 12v10M36 12v10M28 22v10M44 22v10M20 32v10M36 32v10M28 42v10M44 42v10"/></g>`,
    clock: `<g ${S}><rect x="20" y="6" width="24" height="52" rx="3"/><circle cx="32" cy="20" r="8"/><path d="M32 20v-5M32 20l4 2M32 30v14"/><circle cx="32" cy="46" r="3"/></g>`,
    card: `<g ${S}><rect x="10" y="16" width="44" height="32" rx="4"/><circle cx="24" cy="30" r="5"/><path d="M17 42c2-5 12-5 14 0M36 26h12M36 32h12M36 38h8"/></g>`,
    chair: `<g ${S}><path d="M20 8v48M20 32h24v24M44 32V20M20 20h24"/></g>`,
    ruler: `<g ${S}><rect x="6" y="24" width="52" height="16" rx="2"/><path d="M14 24v6M22 24v9M30 24v6M38 24v9M46 24v6"/></g>`,
    bulb: `<g ${S}><path d="M24 40c0-6-8-9-8-18a16 16 0 0 1 32 0c0 9-8 12-8 18z"/><path d="M26 46h12M28 52h8M20 12l-6-6M44 12l6-6"/></g>`,
    note: `<g ${S}><path d="M16 6h24l10 10v42H16z"/><path d="M40 6v10h10M22 28h20M22 36h20M22 44h12"/></g>`,
    star: `<g ${S}><path d="M32 8l7 15 16 2-12 11 3 16-14-8-14 8 3-16L9 25l16-2z"/></g>`,
    wave: `<g ${S}><path d="M8 32h6l4-10 6 22 6-30 6 30 6-22 4 10h10"/></g>`,
    folder: `<g ${S}><path d="M6 18h20l4 6h28v28H6z"/><path d="M6 30h52"/></g>`,
    coin: `<g ${S}><ellipse cx="32" cy="18" rx="18" ry="7"/><path d="M14 18v10c0 4 8 7 18 7s18-3 18-7V18M14 28v10c0 4 8 7 18 7s18-3 18-7V28"/></g>`,
    cage: `<g ${S}><rect x="10" y="10" width="44" height="44"/><path d="M19 10v44M28 10v44M37 10v44M46 10v44M10 54l-4 6M54 54l4 6"/></g>`,
    blank: `<g ${S} stroke-dasharray="5 5"><rect x="10" y="10" width="44" height="44"/></g><path d="M22 32h20" stroke="currentColor" stroke-width="2.4"/>`,
    house: `<g ${S}><path d="M8 30L32 10l24 20M14 26v28h36V26"/><path d="M26 54V40h12v14"/><path d="M4 58l8-4M60 58l-8-4"/></g>`,
    phone: `<g ${S}><rect x="20" y="6" width="24" height="52" rx="4"/><path d="M28 50h8"/><circle cx="32" cy="24" r="6"/><path d="M24 40c2-6 14-6 16 0"/></g>`,
    eye: `<g ${S}><path d="M4 32s10-16 28-16 28 16 28 16-10 16-28 16S4 32 4 32z"/><circle cx="32" cy="32" r="7"/></g>`,
    blueprint: `<g ${S}><rect x="6" y="10" width="52" height="44"/><path d="M6 30h30v24M36 10v12M46 30h12"/><path d="M40 36l12 12M52 36L40 48"/></g>`,
    bowl: `<g ${S}><path d="M10 30h44a22 18 0 0 1-44 0z"/><path d="M26 22c0-6 4-6 4-12M36 22c0-6 4-6 4-12"/><path d="M24 54h16"/></g>`,
    frame: `<g ${S}><rect x="8" y="12" width="48" height="36"/><path d="M8 12l48 36"/><path d="M26 56h12"/></g>`,
    sun: `<g ${S}><path d="M8 44h48M14 52h36"/><path d="M18 44a14 14 0 0 1 28 0"/><path d="M32 12v8M14 20l5 5M50 20l-5 5M6 34h6M52 34h6"/></g>`,
    keys: `<g ${S}><circle cx="20" cy="20" r="8"/><circle cx="34" cy="16" r="6"/><path d="M26 26l18 18M38 38l-4 4M42 42l-4 4M38 22l14 14M48 32l-3 3"/></g>`,
    key: `<g ${S}><circle cx="18" cy="32" r="10"/><path d="M28 32h28M48 32v8M54 32v6"/></g>`,
    window: `<g ${S}><rect x="14" y="10" width="36" height="44"/><path d="M32 10v44M14 32h36"/><circle cx="23" cy="22" r="3"/></g>`,
    marker: `<g ${S}><path d="M32 50L16 22h32z"/><path d="M8 56h48"/><path d="M40 12l8-6M48 18l8-2"/></g>`
  };
  const OF = {
    ket_thu_nhan: 'note', ket_kep_toc: 'star', ket_tieng_da: 'wave', buc_tuong_moi: 'wall', can_ho_di_theo: 'clock',
    do_de_quen: 'card', o_lai: 'chair', do_mai: 'ruler', tat_den: 'bulb', ket2_ban_giao: 'note', ket2_ho_so_lanh: 'folder',
    ket2_phan_chia: 'coin', ban_cong_lo_lung: 'cage', khong_co_trong_ho_so: 'blank', nguoi_giu_nha: 'house',
    ket3_tu_thu: 'phone', ket3_cong_khai: 'eye', ket3_thiet_ke: 'blueprint', can_ho_mau: 'bowl', sai_so: 'ruler',
    ngoai_khung_hinh: 'frame', ket4_tron_ven: 'sun', ket4_ky_uc: 'keys', ket4_ho_so_dung: 'folder', ket4_nguoi_o_lai: 'window',
    moc_troi: 'marker', chia_khoa_giu_lai: 'key'
  };
  window.EndingIcon = (id) => `<svg class="eicon" viewBox="0 0 64 64" aria-hidden="true">${D[OF[id]] || D.note}</svg>`;
})();
