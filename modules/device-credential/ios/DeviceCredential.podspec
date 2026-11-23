Pod::Spec.new do |s|
  s.name           = 'DeviceCredential'
  s.version        = '1.0.0'
  s.summary        = 'Device passcode authentication for TECMA Móvil Connect'
  s.description    = s.summary
  s.license        = { :type => 'Proprietary' }
  s.author         = 'Tecma'
  s.homepage       = 'https://www.tecma.com'
  s.platform       = :ios, '15.1'
  s.source         = { :git => '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.frameworks = 'LocalAuthentication', 'Security'
  s.source_files = '**/*.swift'
end
