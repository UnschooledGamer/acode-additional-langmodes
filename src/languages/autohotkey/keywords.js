function words(value) {
	return new Set(value.trim().toLowerCase().split(/\s+/));
}

// Shared AutoHotkey v1/v2 control-flow and declaration keywords.
export const controlKeywords = words(`
	and as break case catch class continue else extends false finally for
	global if in is local loop new not or return static super switch this
	throw true try until while
`);

// Commands are still important for v1 files. Many also remain callable
// functions in v2, where highlighting them as built-ins is still useful.
export const commands = words(`
	autotrim blockinput click clipwait control controlclick controlfocus
	controlget controlgetfocus controlgetpos controlgettext controlmove
	controlsend controlsendraw controlsettext coordmode critical
	detecthiddentext detecthiddenwindows drive driveget drivespacefree edit
	envadd envdiv envget envmult envset envsub envupdate exit exitapp
	fileappend filecopy filecopydir filecreatedir filecreateshortcut filedelete
	fileencoding filegetattrib filegetshortcut filegetsize filegettime
	filegetversion fileinstall filemove filemovedir fileread filereadline
	filerecycle filerecycleempty fileremovedir fileselectfile fileselectfolder
	filesetattrib filesettime formattime getkeystate gosub goto groupactivate
	groupadd groupclose groupdeactivate gui guicontrol guicontrolget hotkey
	ifequal ifexist ifgreater ifgreaterorequal ifinstring ifless
	iflessorequal ifmsgbox ifnotequal ifnotexist ifnotinstring ifwinactive
	ifwinexist ifwinnotactive ifwinnotexist imagesearch inidelete iniread
	iniwrite input inputbox keyhistory keywait listhotkeys listlines listvars
	menu mouseclick mouseclickdrag mousegetpos mousemove msgbox onexit
	outputdebug pause pixelgetcolor pixelsearch postmessage process progress
	random regdelete regread regwrite reload run runas runwait send sendevent
	sendinput sendlevel sendmessage sendmode sendplay sendraw setbatchlines
	setcapslockstate setcontroldelay setdefaultmousespeed setenv setformat
	setkeydelay setmousedelay setnumlockstate setregview setscrolllockstate
	setstorecapslockmode settimer settitlematchmode setwindelay setworkingdir
	shutdown sleep sort soundbeep soundget soundgetwavevolume soundplay soundset
	soundsetwavevolume splashimage splashtextoff splashtexton splitpath
	statusbargettext statusbarwait stringcasesense stringgetpos stringleft
	stringlen stringlower stringmid stringreplace stringright stringsplit
	stringtrimleft stringtrimright stringupper suspend sysget thread tooltip
	transform traytip urldownloadtofile winactivate winactivatebottom winclose
	winget wingetactivestats wingetactivetitle wingetclass wingetpos wingettext
	wingettitle winhide winkill winmaximize winmenuselectitem winminimize
	winminimizeall winminimizeallundo winmove winrestore winset winsettitle
	winshow winwait winwaitactive winwaitclose winwaitnotactive
`);

export const builtins = words(`
	abs acos array asin atan buffer callbackcreate callbackfree caretgetpos
	ceil chr classnn clipboardall clipwait comcall comobjactive comobjarray
	comobjclass comobjconnect comobjflags comobjfromptr comobjget comobjquery
	comobjtype comobjvalue cos dateadd datediff dircopy dircreate direxist
	dirmove dirselect dirdelete download dllcall driveeject drivegetcapacity
	drivegetfilesystem drivegetlabel drivegetlist drivegetserial
	drivegetspacefree drivegetstatus drivegettype drivesetlabel envget envset
	exp fileappend filecopy filecreateShortcut filedelete fileencoding fileexist
	filegetattrib filegetshortcut filegetsize filegettime filegetversion
	fileinstall filemove fileopen fileread filerecycle filerecycleempty
	fileselect filesetattrib filesettime float floor format formattime func
	getkeyname getkeystate getkeysc getkeyvk hasbase hotif hotkey imageSearch
	iniDelete iniRead iniWrite inputBox instr integer islabel isobject
	isnumber isset istype keyhistory keywait listlines listvars ln loadpicture
	log ltrim map max menu min mod monitorget monitorgetcount monitorgetname
	monitorgetprimary monitorgetworkarea mouseclick mouseclickdrag mousedown
	mousegetpos mousemove mouseup mousewheel msgbox numget numput number
	objaddref objgetbase objhasownprop objownpropcount objrelease
	onclipboardchange onerror onexit onmessage ord outputdebug pause
	pixelgetcolor pixelsearch processclose processexist processgetname
	processgetparent processsetpriority processwait processwaitclose
	random randomseed regcreatekey regdelete regdeletekey regenumkey
	regenumval regread regwrite reload round run runas runwait send sendevent
	sendinput sendmessage sendmode sendplay setcapslockstate setcontroldelay
	setdefaultmousespeed setkeydelay setmousedelay setnumlockstate
	setregview setscrolllockstate settimer settitlematchmode setwindelay
	setworkingdir shutdown sin sleep sort soundbeep soundgetinterface
	soundgetmute soundgetname soundgetvolume soundplay soundsetmute
	soundsetvolume splitpath sqrt statusbargettext statusbarwait strcompare
	strget string strlen strlower strptr strput strreplace strsplit strtitle
	strupper substr sysget thread tooltip trayseticon traysettip trim type
	varsetstrcapacity winactivate winactivatebottom winactive winclose winexist
	wingetclass wingetclientpos wingetcontrols wingetcontrolsHwnd wingetcount
	wingetid wingetidlast wingetlist wingetminmax wingetpid wingetpos
	wingetprocessname wingetprocessexepath wingetstyle wingettext wingettitle
	winhide winkill winmaximize winminimize winminimizeall winmove winredraw
	winrestore winsetalwaysontop winsetenabled winsetregion winsetstyle
	winsettitle winsettranscolor winsettransparent winshow winwait
	winwaitactive winwaitclose winwaitnotactive
`);

export const builtInVariables = words(`
	a_ahkpath a_ahkversion a_appdata a_appdatacommon a_args a_caretx a_carety
	a_computername a_cursor a_dd a_ddd a_dddd a_desktop a_desktopcommon
	a_endchar a_eventinfo a_exitreason a_gui a_guicontrol a_guievent a_guix
	a_guiy a_hour a_iconfile a_iconhidden a_iconnumber a_icontip a_index
	a_ipaddress1 a_ipaddress2 a_ipaddress3 a_ipaddress4 a_is64bitos a_isadmin
	a_iscompiled a_iscritical a_ispaused a_issuspended a_isunicode a_language
	a_lasterror a_linefile a_linenumber a_loopfield a_loopfileattrib
	a_loopfiledir a_loopfileext a_loopfilefullpath a_loopfilelongpath
	a_loopfilename a_loopfileshortname a_loopfileshortpath a_loopfilesize
	a_loopfilesizekb a_loopfilesizemb a_loopfiletimeaccessed
	a_loopfiletimecreated a_loopfiletimemodified a_loopreadline a_mday a_min
	a_mm a_mmm a_mmmm a_mon a_msec a_mydocuments a_now a_nowutc a_ostype
	a_osversion a_priorhotkey a_priorkey a_programfiles a_programs
	a_programscommon a_ptrsize a_screendpi a_screenheight a_screenwidth
	a_scriptdir a_scriptfullpath a_scripthwnd a_scriptname a_sec a_space
	a_startmenu a_startmenucommon a_startup a_startupcommon a_tab a_temp
	a_thisfunc a_thishotkey a_thislabel a_thismenu a_thismenuitem
	a_thismenuitempos a_tickcount a_timeidle a_timeidlephysical
	a_timesincepriorhotkey a_timesincethishotkey a_username a_wday a_windir
	a_workingdir a_yday a_year a_yweek a_yyyy clipboard clipboardall comspec
	errorlevel programfiles
`);
